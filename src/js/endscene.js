import { BoundingBox, Scene, Vector, Actor,} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Endscene extends Scene {
    game
    storyscene1

    constructor(game) {
        super();
        this.game = game
    }


    

    onInitialize(engine) {
        console.log('eindscenetijd')
        this.endscene = new Actor()
        this.endscene.graphics.use(Resources.EndScene.toSprite())
        this.endscene.pos = new Vector(720, 450)
        this.endscene.scale = new Vector (10, 10)
        this.add(this.endscene)

        setTimeout(() => {this.endscene.actions.fade(0, 2000)}, 5000) 
        
        setTimeout(() => { this.game.goToEndcredits()}, 7000) 
        
        
        


        

    }
    onPreUpdate(){

        

        
    }      
    
    
}

