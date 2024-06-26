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
            pos: new Vector(25, 35),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 60,
                color: Color.Black
            })
        })
        this.scoreTextBG.z = 998
        this.addChild(this.scoreTextBG)

        this.graphics.use(Resources.SuperNectarIcon.toSprite())

        this.scoreText = new Label({
            text: '0',
            pos: new Vector(25, 40),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 60,
                color: Color.White
            })
        })
        this.scoreText.z = 999
        this.addChild(this.scoreText)


    }

    setScore() {
        let value = this.game.inventory.superNecterAmount
        value = value.toString()
        this.scoreText.text = value
        this.scoreTextBG.text = value
        //this.game.scenes['overworld'].doorLevelHandler(value, 0);
    }
}
