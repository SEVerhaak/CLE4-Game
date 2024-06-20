import { BoundingBox, Scene, Vector, Actor, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'


export class ControlScene extends Scene {
    game

    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {

        const controlScene = new Actor()
        controlScene.graphics.use(Resources.ControlScene.toSprite())
        controlScene.pos = new Vector(720, 450)
        controlScene.scale = new Vector(3.6, 3.6)
        this.add(controlScene)

        setTimeout(() => { this.game.goToOverWorld() }, 10000)



    }

}
