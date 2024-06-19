import { BoundingBox, Scene, Vector, Actor, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'


export class StartScene extends Scene {
    game

    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {

        const startScene = new Actor()
        startScene.graphics.use(Resources.StartScene.toSprite())
        startScene.pos = new Vector(720, 450)
        startScene.scale = new Vector(3.4, 3.4)
        this.add(startScene)

        setTimeout(() => { this.game.goToStoryScene() }, 5000)



    }

}
