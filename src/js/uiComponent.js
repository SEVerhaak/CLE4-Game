import {Font, Label, ScreenElement, Vector} from "excalibur";
import {Resources} from "./resources.js";

export class UI extends ScreenElement {

    game
    score
    scoreText

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        //this.initNectarScore()
        //this.updateScore('5')
        this.graphics.use(Resources.UIBG.toSprite())
    }

    initNectarScore(){
        this.scoreText = new Label({
            text: 'Nectars verzameld: 0',
            pos: new Vector(40 , 40),
            font: new Font({size: 20}),
        })
        this.addChild(this.scoreText)
        this.scoreText.z = 99;
        this.z = 99;
    }
}