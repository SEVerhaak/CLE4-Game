import { BoundingBox, Scene, Vector, Actor,} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class StoryScene extends Scene {
    game
    storyscene1

    constructor(game) {
        super();
        this.game = game
    }


    

    onInitialize(engine) {
        this.endscene = new Actor()
        Resources.Introscenesound.play()
        this.endscene.graphics.use(Resources.StoryScene1.toSprite())
        this.endscene.pos = new Vector(720, 450)
        this.endscene.scale = new Vector (10, 10)
        this.add(this.endscene)
        
        setTimeout(() => { this.game.goToOverWorld()}, 57000) 
        
        
        

    }
    onPreUpdate(){

        setTimeout(() => {this.endscene.opacity--}, 500) 

        
    }      
    
    
}

