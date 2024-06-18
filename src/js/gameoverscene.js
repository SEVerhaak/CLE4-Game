import { BoundingBox, Scene, Vector, Actor, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js"
import { Pigeon } from "./pigeon.js"
import { Phoenix } from "./phoenix.js"
import { Spider } from "./Spider.js"

export class GameOverScene extends Scene {

    game
    enemy

    constructor(game, enemy) {
        super();
        this.game = game
        this.enemy = enemy
        console.log(enemy)
    }

    onInitialize(engine) {

        const gameover = new Actor()

        if (this.enemy instanceof Bat) {

            gameover.graphics.use(Resources.GameOverBat.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(1.5, 1.5)

        }

        else if (this.enemy instanceof Pigeon) {

            gameover.graphics.use(Resources.GameOverPigeon.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(1.5, 1.5)

        }

        else if (this.enemy instanceof Phoenix) {

            gameover.graphics.use(Resources.GameOverPhoenix.toSprite())
            gameover.pos = new Vector(720, 450)
            gameover.scale = new Vector(1.5, 1.5)

        }

        else if (this.enemy instanceof Spider) {

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



    }





}