import {Color, Font, FontUnit, Label, ScreenElement, Vector} from "excalibur";
import {Resources} from "../resources.js";

export class CurrentHat extends ScreenElement {

    game
    scoreText
    scoreTextBG

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        this.graphics.use(Resources.TopHat.toSprite())
    }

    setScore(){
        let value = this.game.inventory.nectarAmount + 1
        value = value.toString()
        this.scoreText.text = value
        this.scoreTextBG.text = value
    }
}
