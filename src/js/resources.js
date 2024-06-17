import { ImageSource, Sound, Resource, Loader } from 'excalibur'
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
    SpiderWalk: new ImageSource('images/spiderBoss/Walk_Body.png'),
    SpiderAttack: new ImageSource('images/spiderBoss/Attack_03_Body.png'),
    SpiderDie: new ImageSource('images/spiderBoss/Die_02_Body.png'),
    SpiderHit: new ImageSource('images/spiderBoss/Hit_Body.png'),
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
    Flowers: new ImageSource('images/Flowers_With_Outline_Spritesheet.png'),
    Chest: new ImageSource('images/Chests.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }