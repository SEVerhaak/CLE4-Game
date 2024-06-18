import { BoundingBox, Scene, Vector, Actor, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class GameOverScene extends Scene {

    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {


        console.log(this.game)

        const gameover = new Actor()
        gameover.graphics.use(Resources.GameOverBat.toSprite())
        gameover.pos = new Vector(720, 450)
        gameover.scale = new Vector(1.5, 1.5)
        this.add(gameover)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log('space')
            this.game.goToOverWorld();

        }
    }





}