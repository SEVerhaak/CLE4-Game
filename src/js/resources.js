import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'
//import { ControlScene, StartScene } from './startScene'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    BeeIdle: new ImageSource('images/player/Bee_Idle.png'),
    BeeWalk: new ImageSource('images/player/Bee_Walk.png'),
    BatFly: new ImageSource('images/Bat/batFly.png'),
    BatHurt: new ImageSource('images/Bat/BatHit.png'),
    BeeAttack: new ImageSource('images/player/Bee_Attack.png'),
    BeeDeath: new ImageSource('images/player/Bee_Death.png'),
    BatAttack: new ImageSource('images/Bat/BatAttack.png'),
    BatDeath: new ImageSource('images/Bat/batDeath.png'),
    PigeonFly: new ImageSource('images/Pigeon/Vulture_walk.png'),
    PigeonAttack: new ImageSource('images/Pigeon/Vulture_attack.png'),
    PigeonDeath: new ImageSource('images/Pigeon/Vulture_death.png'),
    PigeonHurt: new ImageSource('images/Pigeon/Vulture_hurt.png'),
    Projectile: new ImageSource('images/projectile/projectiles.png'),
    TestProjectile: new ImageSource('images/projectile/testanimprojectile.png'),
    FireProjectile2: new ImageSource('images/projectile/fireProjectile2.png'),
    SmallSpider: new ImageSource('images/SpiderSpriteSheet.png'),
    tinySpider: new ImageSource('images/Spider_Sprite_Sheet.png'),
    Phoenix: new ImageSource('images/Phoenix_SpriteSheet_1.png'),
    Nectar: new ImageSource('images/nectar.png'),
    Level4: new TiledResource('images/Level_4.tmx', {
        useMapBackgroundColor: true
    }),
    Level3: new TiledResource('images/Level_3.tmx', {
        useMapBackgroundColor: true
    }),
    Level2: new TiledResource('images/Level_2.tmx', {
        useMapBackgroundColor: true
    }),
    Level1: new TiledResource('images/Level_1.tmx', {
        useMapBackgroundColor: true
    }),
    MainScene: new TiledResource('images/mainScene_test.tmx', {
        useMapBackgroundColor: true
    }),
    Shadow: new ImageSource('images/shadow.png'),
    Endcredits: new ImageSource('images/aftitelingHeemraadsHive.png'),
    FireProjectile3: new ImageSource('images/projectile/projectile3.png'),
    UIBG: new ImageSource('images/UI/uiBG.png'),
    PixelFont: new FontSource('fonts/PressStart2P-Regular.ttf', 'PressStart'),
    Flowers: new ImageSource('images/Flowers_With_Outline_Spritesheet.png'),
    Chest: new ImageSource('images/Chests.png'),
    Bush1: new ImageSource('images/Pixel Art Flower Pack/Bush 1 (No Flowers)/Bush 1 (no flowers) - GREEN.png'),
    Bush2: new ImageSource('images/Pixel Art Flower Pack/Bush 1 (No Flowers)/Bush 1 (no flowers) - RED.png'),
    Bush3: new ImageSource('images/Pixel Art Flower Pack/Bush 1 (No Flowers)/Bush 1 (no flowers) - WARM GREEN.png'),
    Door: new ImageSource('images/door.png'),
    StoryScene1: new ImageSource('images/story/StoryScene1.png'),
    StoryScene2: new ImageSource('images/story/StoryScene2.png'),
    StoryScene3: new ImageSource('images/story/StoryScene3.png'),
    StoryScene4: new ImageSource('images/story/StoryScene4.png'),
    StoryScene5: new ImageSource('images/story/StoryScene5.png'),
    EndScene: new ImageSource('images/story/endscene.png'),
    Man1: new ImageSource('images/Player.png'),
    Man2: new ImageSource('images/Player 1.png'),
    Man3: new ImageSource('images/Player 2.png'),
    TopHat: new ImageSource('images/Hats/lulhat_0.png'),
    WizardHat: new ImageSource('images/Hats/wizard_hat_female.png'),
    Introscenesound: new Sound('music/introscene.mp3'),
    Mainthemesound: new Sound('music/Maintheme.mp3'),
    GameOverBat: new ImageSource('images/scenes/gameOverBat.png'),
    GameOverPigeon: new ImageSource('images/scenes/gameOverPideon.png'),
    GameOverSpider: new ImageSource('images/scenes/gameOverSpider.png'),
    GameOverPhoenix: new ImageSource('images/scenes/gameOverPhoenix.png'),
    GameOver: new ImageSource('images/scenes/gameOver.png'),
    Glow: new ImageSource('images/glow.png'),
    ChristmasHat: new ImageSource('images/Hats/ChristmasHat.PNG'),
    GraduationHat: new ImageSource('images/Hats/GratuationHat.png'),
    SombreroHat: new ImageSource('images/Hats/sombreroHat.png'),
    StartScene: new ImageSource('images/scenes/StartScene.png'),
    ControlScene: new ImageSource('images/scenes/controls.png'),
    MiniNectar: new ImageSource('images/miniNectar.png'),
    PrideHat: new ImageSource('images/Hats/prideHat.png'),
    NectarMedium: new ImageSource('images/nectarmed.png'),
    NectarSFX: new Sound('sfx/bubble.mp3'),
    InterActionSFX: new Sound('sfx/interactsound.mp3'),
    InteractSFXOne: new Sound ('sfx/interact1.mp3'),
    InteractSFXTwo: new Sound ('sfx/interact2.mp3'),
    InteractSFXThree: new Sound ('sfx/interact3.mp3'),
    Black: new ImageSource('images/Black.png'),
    GayHatIcon: new ImageSource('images/hat_icons/gayhaticon.png'),
    GradHatIcon: new ImageSource('images/hat_icons/gradhaticon.png'),
    SantaHatIcon: new ImageSource('images/hat_icons/santaicon.png'),
    SombreroIcon: new ImageSource('images/hat_icons/sombreroicon.png'),
    TopHatIcon: new ImageSource('images/hat_icons/tophaticon.png'),
    WizzardIcon: new ImageSource('images/hat_icons/wizzardicon.png'),
    Transparent: new ImageSource('images/hat_icons/transparent.png'),
    Finalboss: new ImageSource('images/Endboss.png'),
    SuperNectar: new ImageSource('images/superNectar.png'),
    SuperNectarIcon: new ImageSource('images/supernectaricon.png'),
    Levelbossmusic: new Sound('music/Levelmusic.mp3'),
    Worldmusic: new Sound('music/overworldmusic.mp3'),
    Finalbossmusic: new Sound('music/Finalbossmusic.mp3'),
    GameOverSound: new Sound('music/gameOverSound.mp3'),
    Cross: new ImageSource('images/cross.png'),
    Check: new ImageSource('images/check.png'),
    Explosion: new ImageSource('images/explosion.png'),
    MedicNectar: new ImageSource('images/medicnectar.png'),
    FireProjectile4: new ImageSource('images/projectile/projectile4.png'),
    FireProjectile5: new ImageSource('images/projectile/projectile5.png'),
    Ambiance: new Sound('sfx/park.mp3'),
    WooshOne: new Sound('sfx/woosh1.mp3'),
    WooshTwo: new Sound('sfx/woosh2.mp3'),
    WooshLarge: new Sound('sfx/wooshLarge.mp3'),
    Impact: new Sound('sfx/impact.mp3'),
    Equip: new Sound('sfx/equip.mp3'),
    ExplosionSound: new Sound('sfx/explosion.mp3'),
    Open: new Sound('sfx/open.mp3'),
    DeathSoundMan: new Sound('sfx/deathSoundMan.mp3')

}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }