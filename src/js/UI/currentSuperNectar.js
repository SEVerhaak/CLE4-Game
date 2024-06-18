import {Color, Font, FontUnit, Label, ScreenElement, Vector} from "excalibur";
import {Resources} from "../resources.js";

export class CurrentSuperNectar extends ScreenElement {

    game
    score
    scoreText
    scoreTextBG

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        this.scoreTextBG = new Label({
            text: '0',
            pos: new Vector(660, 1060),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 900,
                color: Color.Black
            })
        })
        this.scoreTextBG.z = 998
        this.addChild(this.scoreTextBG)

        this.graphics.use(Resources.Nectar.toSprite())

        this.scoreText = new Label({
            text: '0',
            pos: new Vector(700, 1100),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 900,
                color: Color.White
            })
        })
        this.scoreText.z = 999
        this.addChild(this.scoreText)

    }

    setScore(value){
        this.scoreText.text = value
        this.scoreTextBG.text = value
    }
}
