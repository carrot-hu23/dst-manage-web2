import fs from 'node:fs';
import assert from 'node:assert/strict';

const modPage = fs.readFileSync('src/pages/Mod/index.jsx', 'utf8');
const modList = fs.readFileSync('src/pages/Mod/ModList/index.jsx', 'utf8');

assert(!modPage.includes('getHomeConfigApi'), 'Mod page must not initialize from /api/game/config Master modData');
assert(modPage.includes('const loadedLevels = await reFlushLevels(cluster)'), 'Mod page must load levels before initializing visible mods');
assert(modPage.includes('findDefaultLevel(loadedLevels)'), 'Mod page must choose an explicit default world from levels');
assert(modPage.includes('initModConfigList(defaultLevel.modoverrides'), 'Mod page must render from the selected/default level modoverrides');
assert(modList.includes('value={selectedLevelUuid || undefined}'), 'World Select must be controlled by selected level uuid');
assert(!modList.includes('defaultValue={levels[0].levelName}'), 'World Select must not mix levelName defaultValue with uuid option values');
assert(modList.includes('item.uuid === selectedLevelUuid'), 'Per-world save/delete must target the same selected level uuid used by the UI');

console.log('mod world-source regression checks passed');
