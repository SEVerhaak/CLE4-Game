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
        //this.graphics.use(Resources.TopHat.toSprite())
    }

    setIcon(hat){
        let icon = hat.icon
        this.graphics.use(icon.toSprite())
    }
}
