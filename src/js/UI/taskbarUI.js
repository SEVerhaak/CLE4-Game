import { Color, Font, FontUnit, Label, ScreenElement, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class TaskbarUI extends ScreenElement {

    game
    taskText
    taskTextBG
    taskTwoText
    taskTwoTextBG

    constructor(game) {
        super();
        this.game = game
    }

    initTaskBar(){
        this.graphics.use(Resources.NectarMedium.toSprite())

        this.taskTextBG = new Label({
            text: 'Verzamel x aantal nectar',
            pos: new Vector(25, 38),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 15,
                color: Color.Black
            })
        })
        this.taskTextBG.z = 998
        this.addChild(this.taskTextBG)

        this.taskText = new Label({
            text: 'Verzamel x aantal nectar',
            pos: new Vector(25, 40),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 15,
                color: Color.White
            })
        })
        this.taskText.z = 999
        this.addChild(this.taskText)

        this.taskTwoTextBG = new Label({
            text: 'Verzamel x aantal nectar',
            pos: new Vector(25, 0),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 15,
                color: Color.Black
            })
        })
        this.taskTwoTextBG.z = 998
        this.addChild(this.taskTwoTextBG)

        this.taskTwoText = new Label({
            text: 'Verzamel x aantal nectar',
            pos: new Vector(25, 2),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 15,
                color: Color.White
            })
        })
        this.taskTwoText.z = 999
        this.addChild(this.taskTwoText)

    }

    onInitialize(engine) {
        this.initTaskBar()

    }
}
