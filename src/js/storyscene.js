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
        this.storyscene1 = new Actor()
        this.storyscene1.graphics.use(Resources.StoryScene1.toSprite())
        this.storyscene1.pos = new Vector(720, 450)
        this.storyscene1.scale = new Vector (10, 10)
        this.add(this.storyscene1)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene2.toSprite()) }, 2000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene3.toSprite()) }, 4000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene4.toSprite()) }, 6000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene5.toSprite()) }, 8000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene5.toSprite()) }, 8000) 
        setTimeout(() => { this.game.goToOverWorld()}, 10000) 
        
        
        

    }
    onPreUpdate(){
        
    }      
    
    
}