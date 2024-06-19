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
        console.log('kaas')
        if (this.game.inventory.hats[this.game.inventory.getSelectedHatID()] === null || this.game.inventory.hats[this.game.inventory.getSelectedHatID()] === undefined){
            this.graphics.use(Resources.Transparent.toSprite())
        } else{
            let icon = hat.icon
            console.log(icon)
            this.graphics.use(icon.toSprite())
        }

    }
}
