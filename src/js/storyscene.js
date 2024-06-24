import { BoundingBox, Scene, Vector, Actor, Keys, Input } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class StoryScene extends Scene {
    game
    storyscene1
    engine
    space = false;

    constructor(game) {
        super();
        this.game = game
    }




    onInitialize(engine) {
        this.engine = engine
    }
    onPreUpdate() {
        if ((this.engine.input.keyboard.wasPressed(Keys.Space) && this.space) ||
            (this.engine.input.gamepads.at(0).wasButtonPressed(Input.Buttons.Face1) && this.space)) {
            this.sceneSwitch();
        }
    }
    onActivate() {
        this.space = true;
        this.storyscene1 = new Actor()
        Resources.Introscenesound.play()
        this.storyscene1.graphics.use(Resources.StoryScene1.toSprite())
        this.storyscene1.pos = new Vector(720, 450)
        this.storyscene1.scale = new Vector(10, 10)
        this.add(this.storyscene1)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene2.toSprite()) }, 12000)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene3.toSprite()) }, 21000)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene4.toSprite()) }, 26000)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene5.toSprite()) }, 32000)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene2.toSprite()) }, 52000)
        if (!Resources.Introscenesound.isPlaying()){
            this.sceneSwitch();
        }
        //setTimeout(() => { this.sceneSwitch() }, 10000)
    }

    onDeactivate() {
        this.space = false
        Resources.Introscenesound.stop()
    }
    sceneSwitch() {
        if (this.space) {
            this.game.goToScene('controlScene')
        }
    }


}