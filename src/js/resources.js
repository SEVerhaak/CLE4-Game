import {ImageSource, Sound, Resource, Loader, FontSource} from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'

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
    Level4: new TiledResource('images/Level_4.tmx'),
    Level3: new TiledResource('images/Level_3.tmx'),
    Level2: new TiledResource('images/Level_2.tmx'),
    Level1: new TiledResource('images/Level_1.tmx'),
    MainScene: new TiledResource('images/mainScene_test.tmx'),
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
    StoryScene1: new ImageSource('images/Story/StoryScene1.png'),
    StoryScene2: new ImageSource('images/Story/StoryScene2.png'),
    StoryScene3: new ImageSource('images/Story/StoryScene3.png'),
    StoryScene4: new ImageSource('images/Story/StoryScene4.png'),
    StoryScene5: new ImageSource('images/Story/StoryScene5.png'),
    Man1: new ImageSource('images/Player.png'),
    Man2: new ImageSource('images/Player 1.png'),
    Man3: new ImageSource('images/Player 2.png'),
    TopHat: new ImageSource('images/Hats/lulhat_0.png'),
    WizardHat: new ImageSource('images/Hats/wizard_hat_female.png'),
    Introscenesound: new Sound ('music/introscene.mp3'),
    Mainthemesound: new Sound ('music/Maintheme.mp3'),
    GameOverBat: new ImageSource('images/gameOverBat.png'),
    GameOverPigeon: new ImageSource('images/gameOverPideon.png'),
    GameOverSpider: new ImageSource('images/gameOverSpider.png'),
    GameOverPhoenix: new ImageSource('images/gameOverPhoenix.png'),
    GameOver: new ImageSource('images/gameOver.png'),
    Glow: new ImageSource('images/glow.png'),
    ChristmasHat: new ImageSource('images/Hats/ChristmasHat.PNG'),
    GraduationHat: new ImageSource('images/Hats/GratuationHat.png'),
    SombreroHat: new ImageSource('images/Hats/sombreroHat.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }