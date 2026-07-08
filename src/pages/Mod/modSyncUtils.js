import _ from 'lodash';
import {format, parse} from 'lua-json';

export function isWorkshopId(str) {
    return /^[0-9]+$/.test(str);
}

export function buildDefaultConfigOptions(mod) {
    const options = mod?.mod_config?.configuration_options;
    const defaultOptions = {};
    if (!Array.isArray(options)) {
        return defaultOptions;
    }
    options.forEach((item) => {
        if (item?.default !== '' && item?.name !== 'null' && item?.name !== undefined) {
            defaultOptions[item.name] = item.default;
        }
    });
    return defaultOptions;
}

export function normalizeSubscribedMod(mod) {
    return {
        ...mod,
        installed: true,
        enable: true,
    };
}

export function mergeSubscribedMod(currentModList = [], subscribedMod) {
    const normalizedMod = normalizeSubscribedMod(subscribedMod);
    const newModList = [];
    currentModList.forEach((item) => {
        if (String(item.modid) !== String(normalizedMod.modid)) {
            newModList.push(item);
        }
    });
    newModList.push(normalizedMod);
    return newModList;
}

function getConfigOption(configOptions, modid) {
    if (!configOptions) {
        return undefined;
    }
    if (configOptions instanceof Map) {
        return configOptions.get(modid);
    }
    return configOptions[modid];
}

export function formatModOverrideFromList(targetModList = [], defaultConfigOptions = new Map(), modConfigOptions = {}) {
    const chooses = targetModList.filter(mod => mod?.modid);
    const modids = chooses.map(mod => String(mod.modid).replace(/^workshop-/, ''));
    const selectedModConfigOptions = _.pick(modConfigOptions, modids);
    const selectedDefaultOptions = {};

    for (const id of modids) {
        selectedDefaultOptions[id] = getConfigOption(defaultConfigOptions, id) || {};
    }

    const workshopObject = _.merge({}, selectedModConfigOptions, selectedDefaultOptions);
    const workshopIdKeys = Object.keys(workshopObject);
    const workShops = {};

    workshopIdKeys.forEach(workshopId => {
        const rawOptions = workshopObject[workshopId] || {};
        const options = {...rawOptions};
        delete options.null;
        Object.keys(options).forEach(k => {
            if (options[k] === null || options[k] === undefined) {
                delete options[k];
            }
        });

        const normalizedId = String(workshopId).replace(/^workshop-/, '');
        const workshop = isWorkshopId(normalizedId) ? `workshop-${normalizedId}` : workshopId;
        const mod = chooses.find(item => String(item.modid).replace(/^workshop-/, '') === normalizedId);
        workShops[workshop] = {
            configuration_options: options,
            enabled: mod?.enable !== false,
        };
    });

    return format(workShops, {
        singleQuote: false,
    });
}

function normalizeModId(modId) {
    const value = String(modId || '');
    const raw = value.replace(/^workshop-/, '');
    return isWorkshopId(raw) ? raw : value;
}

function normalizeWorkshopKey(modId) {
    const normalized = normalizeModId(modId);
    return isWorkshopId(normalized) ? `workshop-${normalized}` : normalized;
}

function parseModoverridesObject(modoverrides) {
    if (!modoverrides || typeof modoverrides !== 'string') {
        return {};
    }
    try {
        const parsed = parse(modoverrides);
        if (!parsed || typeof parsed !== 'object') {
            return {};
        }
        return {...parsed};
    } catch (error) {
        console.log('parse modoverrides failed', error);
        return {};
    }
}

function formatModoverridesObject(workshops = {}) {
    return format(workshops, {
        singleQuote: false,
    });
}

function getDefaultEntryForMod(modId, defaultConfigOptions = new Map(), modConfigOptions = {}) {
    const normalizedId = normalizeModId(modId);
    const configuredOptions = modConfigOptions?.[normalizedId] || {};
    const defaultOptions = getConfigOption(defaultConfigOptions, normalizedId) || {};
    const options = _.merge({}, configuredOptions, defaultOptions);
    delete options.null;
    Object.keys(options).forEach(k => {
        if (options[k] === null || options[k] === undefined) {
            delete options[k];
        }
    });
    return {
        configuration_options: options,
        enabled: true,
    };
}

export function syncSubscribedModToAllLevels({
    levels = [],
    currentModList = [],
    subscribedMod,
    defaultConfigOptions = new Map(),
    modConfigOptions = {},
}) {
    const normalizedMod = normalizeSubscribedMod(subscribedMod);
    const normalizedId = normalizeModId(normalizedMod.modid);
    const nextDefaultConfigOptions = new Map(defaultConfigOptions instanceof Map ? defaultConfigOptions : Object.entries(defaultConfigOptions || {}));
    const nextModConfigOptions = {...(modConfigOptions || {})};
    nextDefaultConfigOptions.set(normalizedId, buildDefaultConfigOptions(normalizedMod));
    if (!nextModConfigOptions[normalizedId]) {
        nextModConfigOptions[normalizedId] = {};
    }

    const newModList = mergeSubscribedMod(currentModList, {...normalizedMod, modid: normalizedId});
    const workshopKey = normalizeWorkshopKey(normalizedId);

    // 订阅传播只向每个世界自身配置里追加目标 mod，不再用当前选中世界的完整列表覆盖全部世界。
    // 这样可以保留其它世界差异和合法手工/orphan 条目，同时避免把当前世界的 orphan 复制到其它世界。
    const newLevels = levels.map(level => {
        const workshops = parseModoverridesObject(level?.modoverrides);
        if (!workshops[workshopKey]) {
            workshops[workshopKey] = getDefaultEntryForMod(normalizedId, nextDefaultConfigOptions, nextModConfigOptions);
        }
        return {
            ...level,
            modoverrides: formatModoverridesObject(workshops),
        };
    });

    return {
        newLevels,
        newModList,
        nextDefaultConfigOptions,
        nextModConfigOptions,
        modoverrides: newLevels[0]?.modoverrides || 'return {}',
    };
}

export function removeModFromAllLevels({
    levels = [],
    currentModList = [],
    modId,
    defaultConfigOptions = new Map(),
    modConfigOptions = {},
}) {
    const normalizedId = normalizeModId(modId);
    const newModList = currentModList.filter(mod => normalizeModId(mod?.modid) !== normalizedId);
    const nextDefaultConfigOptions = new Map(defaultConfigOptions instanceof Map ? defaultConfigOptions : Object.entries(defaultConfigOptions || {}));
    const nextModConfigOptions = {...(modConfigOptions || {})};

    nextDefaultConfigOptions.delete(normalizedId);
    nextDefaultConfigOptions.delete(modId);
    delete nextModConfigOptions[normalizedId];
    delete nextModConfigOptions[modId];

    const workshopKey = normalizeWorkshopKey(normalizedId);

    // 取消订阅传播只从每个世界自身配置中删除目标 mod，不再把当前世界列表重写到所有世界。
    // 因此只有被取消订阅的 mod 会被全局删除，不会产生/传播其它 orphan 条目。
    const newLevels = levels.map(level => {
        const workshops = parseModoverridesObject(level?.modoverrides);
        delete workshops[workshopKey];
        // 兼容历史配置中可能混入的裸数字 key。
        delete workshops[normalizedId];
        return {
            ...level,
            modoverrides: formatModoverridesObject(workshops),
        };
    });

    return {
        newLevels,
        newModList,
        nextDefaultConfigOptions,
        nextModConfigOptions,
        modoverrides: newLevels[0]?.modoverrides || 'return {}',
    };
}
