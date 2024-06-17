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

    }

    setText(text){
        this.scoreText = new Label({
            text: text,
            pos: new Vector(40 , 40),
            font: new Font({size: 20}),
        })
        this.addChild(this.scoreText)
        this.scoreText.z = 99;
        this.z = 99;
    }

    updateScore(newScore) {
        this.scoreText.text = `Score: ` + newScore
    }
}