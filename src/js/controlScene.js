import { BoundingBox, Scene, Vector, Actor, Keys } from "excalibur"
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

        setTimeout(() => { this.game.goToScene('overworld') }, 10000)



    }
    onPreUpdate() {
        if (this.engine.input.keyboard.wasPressed(Keys.Space) && this.space) {
            console.log('In deze spatie')
            this.game.goToScene('overworld')
        }
    }
    onActivate() {
        this.space = true;
    }
    onDeactivate() {
        this.space = false
    }

}
