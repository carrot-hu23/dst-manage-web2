import i18next from '../locales/i18n.tsx';

const categoryKeys: Record<string, string> = {
    itemlist_clothes: 'clothes',
    itemlist_farming: 'farming',
    itemlist_food: 'food',
    itemlist_equip: 'equip',
    itemlist_base: 'base',
    itemlist_ruins: 'ruins',
    itemlist_building: 'building',
    itemlist_plant: 'plant',
    itemlist_gift: 'gift',
    itemlist_cooking: 'cooking',
    itemlist_den: 'den',
    itemlist_tool: 'tool',
    itemlist_material: 'material',
    itemlist_animal: 'animal',
    itemlist_seeds: 'seeds',
    itemlist_boss: 'boss',
    itemlist_magic: 'magic',
    itemlist_props: 'props',
    itemlist_ore: 'ore',
};

// Translates an itemlist_* category key into the current UI language. Falls
// back to the raw key when it isn't one of the known categories.
export function getCategoryLabel(key: string): string {
    const suffix = categoryKeys[key];
    return suffix ? i18next.t(`items.category.${suffix}`) : key;
}
