import { BoundingBox, Scene, Vector, Actor, Keys, Input } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'


export class ControlScene extends Scene {
    game
    engine
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {

        const controlScene = new Actor()
        controlScene.graphics.use(Resources.ControlScene.toSprite())
        controlScene.pos = new Vector(720, 450)
        this.add(controlScene)

        this.engine = engine;



    }
    onPreUpdate(engine) {
        setTimeout(() => {
            if ((engine.input.keyboard.wasPressed(Keys.Space) && this.space) ||
                (engine.input.gamepads.at(0).wasButtonPressed(Input.Buttons.Face1) && this.space)) {
                this.sceneSwitch();
            }
        }, 1000)
    }
    onActivate() {
        this.space = true;
        setTimeout(() => { this.sceneSwitch() }, 10000)
    }
    onDeactivate() {
        this.space = false
    }
    sceneSwitch() {
        if (this.space) {
            this.game.goToScene('overworld')
        }
    }

}
