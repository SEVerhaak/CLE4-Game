import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    BeeIdle: new ImageSource('images/player/Bee_Idle.png'),
    BeeWalk: new ImageSource('images/player/Bee_Walk.png'),
    BatFly: new ImageSource('images/Bat/batFly.png'),
    Level3: new TiledResource('images/Level3.tmx')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }