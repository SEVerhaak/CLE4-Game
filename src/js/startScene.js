import { BoundingBox, Scene, Vector, Actor, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'


export class StartScene extends Scene {
    game
    engine
    space = false
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
        this.engine = engine;

    }
    onPreUpdate() {
        if ((this.engine.input.keyboard.wasPressed(Keys.Space) && this.space) ||
            this.engine.input.gamepads.at(0).wasButtonPressed(Input.Buttons.Face1)) {
            this.game.goToScene('storyscene')
        }
    }
    onActivate() {
        this.space = true;
        setTimeout(() => {
            this.sceneSwitch()
        }, 5000)
    }
    onDeactivate() {
        this.space = false
    }
    sceneSwitch() {
        if (this.space) {
            console.log('ga naar storyscene')
            this.game.goToScene('storyscene')
        }
    }

}
