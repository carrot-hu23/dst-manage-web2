const dstRolesMap = {
    wendy: '温蒂',
    wilson: '威尔逊',
    willow: '薇洛',
    wolfgang: '沃尔夫冈',
    wx78: 'WX-78',
    wickerbottom: '薇克巴顿',
    woodie: '伍迪',
    wes: '韦斯',
    waxwell: '麦斯威尔',
    wathgrithr: '薇格弗德',
    webber: '韦伯',
    winona: '薇诺娜',
    warly: '沃利',
    walter: '沃尔特',
    wortox: '沃拓克斯',
    wormwood: '沃姆伍德',
    wurt: '沃特',
    wanda: '旺达',
    wonkey: '芜猴',
    mod: '模组角色',
    "": '未知角色',

}
const dstSeason = {
    spring: "春",
    summer: "夏",
    autumn: "秋",
    winter: "冬",
    "": "  "
}

const dstSegs = {
    'night': '夜晚',
    'day': '白天',
    'dusk': '黄昏',
    '': '  '
}

const dstRolesMap2 = {
    '温蒂': 'wendy',
    '威尔逊': 'wilson',
    '薇洛': 'willow',
    '沃尔夫冈': 'wolfgang',
    'WX-78': 'WX-78',
    '薇克巴顿': 'wickerbottom',
    '伍迪': 'woodie',
    '韦斯': 'wes',
    '麦斯威尔': 'waxwell',
    '薇格弗德': 'wathgrithr',
    '韦伯': 'webber',
    '薇诺娜': 'winona',
    '沃利': 'warly',
    '沃尔特': 'walter',
    '沃拓克斯': 'wortox',
    '沃姆伍德': 'wormwood',
    '沃特': 'wurt',
    '旺达': 'wanda',
    '芜猴': 'wonkey',
    '模组角色': 'mod',
    "未知角色": '',
}
const dstRoles = {
    wendy: './assets/dst/wendy_inv.png',
    wilson: './assets/dst/wilson_inv.png',
    willow: './assets/dst/willow_inv.png',
    wolfgang: './assets/dst/wolfgang_inv.png',
    wx78: './assets/dst/wx78_inv.png',
    wickerbottom: './assets/dst/wickerbottom_inv.png',
    woodie: './assets/dst/woodie_inv.png',
    wes: './assets/dst/wes_inv.png',
    waxwell: './assets/dst/waxwell_inv.png',
    wathgrithr: './assets/dst/wathgrithr_inv.png',
    webber: './assets/dst/webber_inv.png',
    winona: './assets/dst/winona_inv.png',
    warly: './assets/dst/warly_inv.png',
    walter: './assets/dst/walter_inv.png',
    wortox: './assets/dst/wortox_inv.png',
    wormwood: './assets/dst/wormwood_inv.png',
    wurt: './assets/dst/wurt_inv.png',
    wanda: './assets/dst/wanda_inv.png',
    wonkey: './assets/dst/wonkey_inv.png',
    mod: './assets/dst/mod_ch_inv.png',
    "": './assets/dst/unknown_ch_inv.png',

}

const customization = "customization"

// 选择服务器的游戏风格。
const dstGameMod = [
    {
        cn: '无尽',
        name: 'endless',
        description: `永不结束的饥荒沙盒模式。\n
        永远可以在绚丽之门复活。\n
        `
    },
    {
        cn: '生存',
        name: 'survival',
        description: `标准《饥荒》体验。\n`
    },
    {
        cn: '荒野',
        name: 'wilderness',
        description: `外面就是荒野,充满了危险!\n
        随机进入世界的一个地方。
        死亡之后:选一名新冒险家试一下、再试一下。\n
        `
    },
    {
        cn: '暗无天日',
        name: 'lightsout',
        description: `在标准《饥荒》体验的基础上添加黑暗基调。\n
        `
    },
    {
        cn: '熔炉',
        name: 'lavaarena',
        description: `伴随着远古传送门的激活，我们的幸存者发现自己现在被困在一个充满敌意的战火世界里。 如果他们还怀抱着回家的渺茫希望，那就需要团结起来击败战神普格纳的军队以及他的王牌——大熔炉猪战士。\n
        `
    },
    {
        cn: '暴食',
        name: 'quagmire',
        description: `好不容易逃出了熔火大门後，我們的求生者們進到了一個被饥饿的野獸所統治的城市遺跡中。合作煮出美味的料理以緩解噬咬永無止盡的飢餓，避免受到可怕詛咒的折磨。煮出來的料理夠好吃，說不定你還可以回到原本的世界\n
        (tips: 暴食模式需要关闭无人暂停)
        `
    },
    {
        cn: '海钓模式',
        name: 'OceanFishing',
        description: `海钓随机物品\n
        `
    },
    {
        cn: '闯关模式',
        name: 'starvingfloor',
        description: `饥荒单机版的闯关模式\n
        `
    },
    {
        cn: '自定义模式',
        name: customization,
        description: `自定义模式\n
        `
    },

]

export function getDstMod(lang, name) {
    if (lang === "en") {
        return name
    }
    let result = name
    dstGameMod.forEach(item=>{
        if (item.name === name) {
            result = item.cn
        }
    })
    return result
}

const forest = `
return {
  desc="永不结束的饥荒沙盒模式。\\
永远可以在绚丽之门复活。",
  hideminimap=false,
  id="ENDLESS",
  location="forest",
  max_playlist_position=999,
  min_playlist_position=0,
  name="无尽",
  numrandom_set_pieces=4,
  override_level_string=false,
  overrides={
    alternatehunt="default",
    angrybees="default",
    antliontribute="default",
    autumn="default",
    bananabush_portalrate="default",
    basicresource_regrowth="always",
    bats_setting="default",
    bearger="default",
    beefalo="default",
    beefaloheat="default",
    beequeen="default",
    bees="default",
    bees_setting="default",
    berrybush="default",
    birds="default",
    boons="default",
    branching="default",
    brightmarecreatures="default",
    bunnymen_setting="default",
    butterfly="default",
    buzzard="default",
    cactus="default",
    cactus_regrowth="default",
    carrot="default",
    carrots_regrowth="default",
    catcoon="default",
    catcoons="default",
    chess="default",
    cookiecutters="default",
    crabking="default",
    crow_carnival="default",
    darkness="default",
    day="default",
    deciduousmonster="default",
    deciduoustree_regrowth="default",
    deerclops="default",
    dragonfly="default",
    dropeverythingondespawn="default",
    evergreen_regrowth="default",
    extrastartingitems="default",
    eyeofterror="default",
    fishschools="default",
    flint="default",
    flowers="default",
    flowers_regrowth="default",
    frograin="default",
    frogs="default",
    fruitfly="default",
    ghostenabled="always",
    ghostsanitydrain="none",
    gnarwail="default",
    goosemoose="default",
    grass="default",
    grassgekkos="default",
    hallowed_nights="default",
    has_ocean=true,
    healthpenalty="always",
    hound_mounds="default",
    houndmound="default",
    hounds="default",
    hunger="default",
    hunt="default",
    keep_disconnected_tiles=true,
    klaus="default",
    krampus="default",
    layout_mode="LinkNodesByKeys",
    lessdamagetaken="none",
    liefs="default",
    lightcrab_portalrate="default",
    lightning="default",
    lightninggoat="default",
    loop="default",
    lureplants="default",
    malbatross="default",
    marshbush="default",
    merm="default",
    merms="default",
    meteorshowers="default",
    meteorspawner="default",
    moles="default",
    moles_setting="default",
    monkeytail_portalrate="default",
    moon_berrybush="default",
    moon_bullkelp="default",
    moon_carrot="default",
    moon_fissure="default",
    moon_fruitdragon="default",
    moon_hotspring="default",
    moon_rock="default",
    moon_sapling="default",
    moon_spider="default",
    moon_spiders="default",
    moon_starfish="default",
    moon_tree="default",
    moon_tree_regrowth="default",
    mosquitos="default",
    mushroom="default",
    mutated_hounds="default",
    no_joining_islands=true,
    no_wormholes_to_disconnected_tiles=true,
    ocean_bullkelp="default",
    ocean_seastack="ocean_default",
    ocean_shoal="default",
    ocean_waterplant="ocean_default",
    ocean_wobsterden="default",
    palmcone_seed_portalrate="default",
    palmconetree="default",
    palmconetree_regrowth="default",
    penguins="default",
    penguins_moon="default",
    perd="default",
    petrification="default",
    pigs="default",
    pigs_setting="default",
    pirateraids="default",
    ponds="default",
    portal_spawnrate="default",
    portalresurection="always",
    powder_monkey_portalrate="default",
    prefabswaps_start="default",
    rabbits="default",
    rabbits_setting="default",
    reeds="default",
    reeds_regrowth="default",
    regrowth="default",
    resettime="none",
    roads="default",
    rock="default",
    rock_ice="default",
    saltstack_regrowth="default",
    sapling="default",
    season_start="default",
    seasonalstartingitems="default",
    shadowcreatures="default",
    sharks="default",
    spawnmode="fixed",
    spawnprotection="default",
    specialevent="default",
    spider_warriors="default",
    spiderqueen="default",
    spiders="default",
    spiders_setting="default",
    spring="default",
    squid="default",
    stageplays="default",
    start_location="default",
    summer="default",
    summerhounds="default",
    tallbirds="default",
    task_set="default",
    temperaturedamage="default",
    tentacles="default",
    terrariumchest="default",
    touchstone="default",
    trees="default",
    tumbleweed="default",
    twiggytrees_regrowth="default",
    walrus="default",
    walrus_setting="default",
    wasps="default",
    weather="default",
    wildfires="never",
    winter="default",
    winterhounds="default",
    winters_feast="enabled",
    wobsters="default",
    world_size="default",
    wormhole_prefab="wormhole",
    year_of_the_beefalo="default",
    year_of_the_carrat="default",
    year_of_the_catcoon="default",
    year_of_the_gobbler="default",
    year_of_the_pig="default",
    year_of_the_varg="default" 
  },
  playstyle="endless",
  random_set_pieces={
    "Sculptures_2",
    "Sculptures_3",
    "Sculptures_4",
    "Sculptures_5",
    "Chessy_1",
    "Chessy_2",
    "Chessy_3",
    "Chessy_4",
    "Chessy_5",
    "Chessy_6",
    "Maxwell1",
    "Maxwell2",
    "Maxwell3",
    "Maxwell4",
    "Maxwell6",
    "Maxwell7",
    "Warzone_1",
    "Warzone_2",
    "Warzone_3" 
  },
  required_prefabs={ "multiplayer_portal" },
  required_setpieces={ "Sculptures_1", "Maxwell5" },
  settings_desc="永不结束的饥荒沙盒模式。\\
永远可以在绚丽之门复活。",
  settings_id="ENDLESS",
  settings_name="无尽",
  substitutes={  },
  version=4,
  worldgen_desc="永不结束的饥荒沙盒模式。\\
永远可以在绚丽之门复活。",
  worldgen_id="ENDLESS",
  worldgen_name="无尽" 
}
`

const cave = `
return {
  background_node_range={ 0, 1 },
  desc="探查洞穴…… 一起！",
  hideminimap=false,
  id="DST_CAVE",
  location="cave",
  max_playlist_position=999,
  min_playlist_position=0,
  name="洞穴",
  numrandom_set_pieces=0,
  override_level_string=false,
  overrides={
    atriumgate="default",
    banana="default",
    basicresource_regrowth="always",
    bats="default",
    bats_setting="default",
    beefaloheat="default",
    berrybush="default",
    boons="default",
    branching="default",
    brightmarecreatures="default",
    bunnymen="default",
    bunnymen_setting="default",
    cave_ponds="default",
    cave_spiders="default",
    cavelight="default",
    chess="default",
    crow_carnival="default",
    darkness="default",
    day="default",
    dropeverythingondespawn="default",
    dustmoths="default",
    earthquakes="default",
    extrastartingitems="default",
    fern="default",
    fissure="default",
    flint="default",
    flower_cave="default",
    flower_cave_regrowth="default",
    fruitfly="default",
    ghostenabled="always",
    ghostsanitydrain="none",
    grass="default",
    grassgekkos="default",
    hallowed_nights="default",
    healthpenalty="always",
    hunger="default",
    krampus="default",
    layout_mode="RestrictNodesByKey",
    lessdamagetaken="none",
    lichen="default",
    liefs="default",
    lightflier_flower_regrowth="default",
    lightfliers="default",
    loop="default",
    marshbush="default",
    merms="default",
    molebats="default",
    moles_setting="default",
    monkey="default",
    monkey_setting="default",
    mushgnome="default",
    mushroom="default",
    mushtree="default",
    mushtree_moon_regrowth="default",
    mushtree_regrowth="default",
    nightmarecreatures="default",
    pigs_setting="default",
    portalresurection="always",
    prefabswaps_start="default",
    reeds="default",
    regrowth="default",
    resettime="none",
    roads="never",
    rock="default",
    rocky="default",
    rocky_setting="default",
    sapling="default",
    season_start="default",
    seasonalstartingitems="default",
    shadowcreatures="default",
    slurper="default",
    slurtles="default",
    slurtles_setting="default",
    snurtles="default",
    spawnmode="fixed",
    spawnprotection="default",
    specialevent="default",
    spider_dropper="default",
    spider_hider="default",
    spider_spitter="default",
    spider_warriors="default",
    spiderqueen="default",
    spiders="default",
    spiders_setting="default",
    start_location="caves",
    task_set="cave_default",
    temperaturedamage="default",
    tentacles="default",
    toadstool="default",
    touchstone="default",
    trees="default",
    weather="default",
    winters_feast="enabled",
    world_size="default",
    wormattacks="default",
    wormhole_prefab="tentacle_pillar",
    wormlights="default",
    worms="default",
    year_of_the_beefalo="default",
    year_of_the_carrat="default",
    year_of_the_catcoon="default",
    year_of_the_gobbler="default",
    year_of_the_pig="default",
    year_of_the_varg="default" 
  },
  required_prefabs={ "multiplayer_portal" },
  settings_desc="探查洞穴…… 一起！",
  settings_id="DST_CAVE",
  settings_name="洞穴",
  substitutes={  },
  version=4,
  worldgen_desc="探查洞穴…… 一起！",
  worldgen_id="DST_CAVE",
  worldgen_name="洞穴" 
}
`

const porkland = `
return {
  background_node_range={ 0, 1 },
  desc="一片极其危险的丛林？",
  hideminimap=false,
  id="PORKLAND_DEFAULT",
  location="porkland",
  max_playlist_position=999,
  min_playlist_position=0,
  name="猪镇",
  numrandom_set_pieces=0,
  override_level_string=false,
  overrides={
    asparagus="default",
    bearger="never",
    bill_setting="default",
    boons="default",
    brambles="default",
    branching="least",
    butterfly="default",
    darkness="default",
    day="default",
    deep_jungle_fern_noise="default",
    deerclops="never",
    dropeverythingondespawn="default",
    dungbeetle_setting="default",
    dungpile="default",
    extrastartingitems="default",
    flowers="default",
    fog="default",
    frog_poison_setting="default",
    frograin="never",
    ghostenabled="always",
    ghostsanitydrain="always",
    glowfly_setting="default",
    glowflycycle="default",
    grass="default",
    grass_tall="default",
    grass_tall_bunches="default",
    grassgekkos="never",
    hanging_vine_patch="default",
    hanging_vine_setting="default",
    has_ocean=true,
    hayfever="default",
    healthpenalty="always",
    hippopotamoose="default",
    hippopotamoose_setting="default",
    humid="default",
    hunger="default",
    hunt="never",
    jungle_border_vine="default",
    keep_disconnected_tiles=true,
    krampus="default",
    layout_mode="RestrictNodesByKey",
    lessdamagetaken="none",
    lightning="default",
    lost_relics="default",
    lotus="default",
    lush="default",
    mandrakeman_setting="default",
    mosquito_setting="default",
    mushroom="default",
    no_joining_islands=false,
    no_wormholes_to_disconnected_tiles=true,
    pangolden="default",
    peagawk="default",
    penguins="never",
    perd="never",
    pigbandit="default",
    piko_setting="default",
    pl_clocktype="plateau",
    pog="default",
    poison="default",
    porkland_season_start="default",
    portalresurection="none",
    prefabswaps_start="classic",
    pugalisk_fountain="default",
    reeds="default",
    resettime="default",
    roads="never",
    rock="default",
    ruined_sculptures="default",
    sapling="default",
    season_start="default",
    shadowcreatures="default",
    spawnmode="fixed",
    spawnprotection="default",
    specialevent="none",
    start_location="PorkLandStart",
    task_set="porkland",
    temperate="default",
    thunderbird_setting="default",
    thunderbirdnest="default",
    vampirebat="default",
    weather="default",
    weevole_setting="default",
    wildfires="never",
    world_size="default",
    wormhole_prefab="wormhole" 
  },
  required_prefabs={ "multiplayer_portal" },
  settings_desc="一片极其危险的丛林？",
  settings_id="PORKLAND_DEFAULT",
  settings_name="猪镇",
  substitutes={  },
  version=2,
  worldgen_desc="一片极其危险的丛林？",
  worldgen_id="PORKLAND_DEFAULT",
  worldgen_name="猪镇" 
}
`

export {
    dstRoles, dstGameMod,customization, dstRolesMap, dstRolesMap2, forest, cave,porkland, dstSeason, dstSegs
}