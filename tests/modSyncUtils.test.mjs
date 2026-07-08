import assert from 'node:assert/strict';
import {
  buildDefaultConfigOptions,
  formatModOverrideFromList,
  mergeSubscribedMod,
  removeModFromAllLevels,
  syncSubscribedModToAllLevels,
} from '../src/pages/Mod/modSyncUtils.js';

const subscribedMod = {
  modid: '1271089343',
  name: 'Global Positions',
  installed: false,
  enable: false,
  mod_config: {
    configuration_options: [
      {name: 'SHOWPLAYERSOPTIONS', default: 'default'},
      {name: 'null', default: 'ignored'},
      {name: 'EMPTY', default: ''},
    ],
  },
};

const existingMod = {
  modid: '378160973',
  name: 'Combined Status',
  installed: true,
  enable: true,
  mod_config: {configuration_options: []},
};

const levels = [
  {
    uuid: 'Master',
    modoverrides: 'return {["workshop-378160973"]={configuration_options={},enabled=true}}',
    world: 'Master',
  },
  {
    uuid: 'Caves',
    modoverrides: 'return {["workshop-378160973"]={configuration_options={},enabled=true}}',
    world: 'Caves',
  },
];

const currentModList = [
  existingMod,
  {...subscribedMod, installed: false, enable: false, name: ''},
];

const modConfigOptions = {
  '378160973': {},
};
const defaultConfigOptions = new Map([
  ['378160973', {}],
]);

assert.deepEqual(buildDefaultConfigOptions(subscribedMod), {
  SHOWPLAYERSOPTIONS: 'default',
});

const merged = mergeSubscribedMod(currentModList, subscribedMod);
assert.equal(merged.length, 2, 'subscription replaces the placeholder instead of duplicating it');
const mergedSubscribed = merged.find((mod) => mod.modid === '1271089343');
assert.equal(mergedSubscribed.installed, true, 'newly subscribed mod is marked installed');
assert.equal(mergedSubscribed.enable, true, 'newly subscribed mod is enabled by default');
assert.equal(mergedSubscribed.name, 'Global Positions', 'workshop metadata replaces ID-only placeholder');

const defaultConfigOptionsWithSubscribed = new Map(defaultConfigOptions);
defaultConfigOptionsWithSubscribed.set('1271089343', buildDefaultConfigOptions(subscribedMod));
const modoverrides = formatModOverrideFromList(merged, defaultConfigOptionsWithSubscribed, modConfigOptions);
assert.match(modoverrides, /\["workshop-1271089343"\]/, 'subscribed mod is written to modoverrides');
assert.match(modoverrides, /enabled = true/, 'subscribed mod is enabled in generated modoverrides');
assert.match(modoverrides, /SHOWPLAYERSOPTIONS/, 'default options are preserved when writing modoverrides');

const disabledModoverrides = formatModOverrideFromList(
  [{...existingMod, enable: false}],
  defaultConfigOptions,
  modConfigOptions,
);
assert.match(disabledModoverrides, /\["workshop-378160973"\]/, 'disabled mod remains serialized instead of being deleted');
assert.match(disabledModoverrides, /enabled = false/, 'disabled mod is persisted as disabled');

const {newLevels, newModList, nextDefaultConfigOptions} = syncSubscribedModToAllLevels({
  levels,
  currentModList,
  subscribedMod,
  defaultConfigOptions,
  modConfigOptions,
});

assert.equal(newModList.find((mod) => mod.modid === '1271089343').enable, true);
assert.deepEqual(nextDefaultConfigOptions.get('1271089343'), {SHOWPLAYERSOPTIONS: 'default'});
assert.equal(newLevels.length, 2);
for (const level of newLevels) {
  assert.match(level.modoverrides, /\["workshop-1271089343"\]/, `${level.uuid} gets the subscribed mod`);
  assert.match(level.modoverrides, /enabled = true/, `${level.uuid} enables the subscribed mod`);
}

const removeResult = removeModFromAllLevels({
  levels: newLevels,
  currentModList: newModList,
  modId: '1271089343',
  defaultConfigOptions: nextDefaultConfigOptions,
  modConfigOptions,
});
assert.equal(removeResult.newModList.some((mod) => mod.modid === '1271089343'), false, 'unsubscribe removes the mod from the visible list');
for (const level of removeResult.newLevels) {
  assert.doesNotMatch(level.modoverrides, /\["workshop-1271089343"\]/, `${level.uuid} removes unsubscribed mod`);
  assert.match(level.modoverrides, /\["workshop-378160973"\]/, `${level.uuid} keeps other mods`);
}
assert.equal(removeResult.nextDefaultConfigOptions.has('1271089343'), false, 'unsubscribe drops default options');

console.log('modSyncUtils tests passed');
