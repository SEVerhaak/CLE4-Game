import { BoundingBox, Scene, Vector, Actor, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./enemies/bat.js"
import { Pigeon } from "./enemies/pigeon.js"
import { Phoenix } from "./enemies/phoenix.js"
import { Spider } from "./enemies/Spider.js"

export class GameOverScene extends Scene {

    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {

    }
    
    GameOverImageHandler(enemy) {
        console.log(enemy)
        const gameover = new Actor()
        this.game.scenes['overworld'].RestartOverWorld();

        if (enemy instanceof Bat) {

            gameover.graphics.use(Resources.GameOverBat.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(1.6, 1.6)

        }

        else if (enemy instanceof Pigeon) {

            gameover.graphics.use(Resources.GameOverPigeon.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(1.8, 1.8)

        }

        else if (enemy instanceof Phoenix) {

            gameover.graphics.use(Resources.GameOverPhoenix.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(2, 2)

        }

        else if (enemy instanceof Spider) {

            gameover.graphics.use(Resources.GameOverSpider.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(1.5, 1.5)

        }

        else {

            gameover.graphics.use(Resources.GameOver.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(2, 2)

        }

        this.add(gameover)
        setTimeout(() => { this.game.goToScene('overworld') }, 5000)

    }





}