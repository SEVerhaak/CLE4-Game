import {Color, Font, FontUnit, Graphic, Label, ScreenElement, Vector} from "excalibur";
import { Resources } from "../resources.js";

export class TaskbarUI extends ScreenElement {

    game
    taskText
    taskTextBG
    taskTwoText
    taskTwoTextBG
    currentLevel
    neededNectarArray = [];
    task1
    task2
    task3
    task4
    taskArray = [this.task1,this.task2,this.task3,this.task4]

    constructor(game) {
        super();
        this.game = game
    }

    initTaskBar(){
        this.graphics.use(Resources.Cross.toSprite())

        this.taskTextBG = new Label({
            text: this.taskArray[this.game.inventory.superNecterAmount],
            pos: new Vector(120, 10),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 60,
                color: Color.Black
            })
        })
        this.taskTextBG.z = 998
        this.addChild(this.taskTextBG)

        this.taskText = new Label({
            text: this.taskArray[this.game.inventory.superNecterAmount],
            pos: new Vector(120, 15),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 60,
                color: Color.White
            })
        })
        this.taskText.z = 999
        this.addChild(this.taskText)

    }

    updateTasks(){
        console.log(this.neededNectarArray[this.currentLevel])
        if (this.game.inventory.nectarAmount >= this.neededNectarArray[this.game.inventory.superNecterAmount]){
            //this.currentLevel = this.game.inventory.level
            this.graphics.use(Resources.Check.toSprite())
            this.taskText.text = 'De boom is nu open!'
            this.taskTextBG.text = 'De boom is nu open!'
        }
    }

    updateLevel(){
        this.currentLevel = this.game.inventory.superNecterAmount
        if (this.currentLevel <= 3){
            this.taskText.text =  this.taskArray[this.currentLevel]
            this.taskTextBG.text =  this.taskArray[this.currentLevel]
            this.graphics.use(Resources.Cross.toSprite())
            console.log(this.currentLevel)
        } else{
            this.taskText.text = 'Vecht met de imker'
            this.taskTextBG.text = 'Vecht met de imker'
        }
    }

    checkLevelUnlocked(){
        this.currentLevel = this.game.inventory.level
        console.log(this.currentLevel)
    }

    initValues(){
        this.currentLevel = this.game.inventory.level

        let scene = this.game.scenes['overworld']
        this.neededNectarArray.push(scene.nectarLevel1,scene.nectarLevel2, scene.nectarLevel3, scene.nectarLevel4)
        console.log(this.neededNectarArray);

        this.task1 = 'Verzamel '+ this.neededNectarArray[0]  +' nectar'
        this.task2 = 'Verzamel '+ this.neededNectarArray[1]  +' nectar'
        this.task3 = 'Verzamel '+ this.neededNectarArray[2]  +' nectar'
        this.task4 = 'Verzamel '+ this.neededNectarArray[3]  +' nectar'
        this.taskArray = [this.task1,this.task2,this.task3,this.task4]
        /*
        nectarLevel1 = 10
        nectarLevel2 = 20
        nectarLevel3 = 30
        nectarLevel4 = 40

         */
    }

    onInitialize(engine) {
        this.initValues()
        this.initTaskBar()
        //this.initTaskBar()
        console.log(this.currentLevel)
    }
}
