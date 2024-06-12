import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    BeeIdle: new ImageSource('images/player/Bee_Idle.png'),
    BeeWalk: new ImageSource('images/player/Bee_Walk.png'),
    BatFly: new ImageSource('images/Bat/batFly.png'),
    BeeAttack: new ImageSource('images/player/Bee_Attack.png'),
    BatAttack: new ImageSource('images/Bat/BatAttack.png'),
    Level3: new TiledResource('images/Level_3.tmx'),
    Level4: new TiledResource('images/Level_4.tmx'),
    PigeonFly: new ImageSource('images/Pigeon/Vulture_walk.png'),
    PigeonAttack: new ImageSource('images/Pigeon/Vulture_attack.png'),
    Level3: new TiledResource('images/Level3.tmx'),

    SpiderWalk: new ImageSource('images/spiderBoss/Walk_Body.png'),
    SpiderAttack: new ImageSource('images/spiderBoss/Attack_03_Body.png'),
    SpiderDie: new ImageSource('images/spiderBoss/Die_02_Body.png'),
    SpiderHit: new ImageSource('images/spiderBoss/Hit_Body.png'),
    SmallSpider: new ImageSource('images/SpiderSpriteSheet.png'),
    Level1: new TiledResource ('images/Level_1.tmx')

}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }