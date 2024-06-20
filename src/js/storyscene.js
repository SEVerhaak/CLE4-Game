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
        Resources.Introscenesound.play()
        this.storyscene1.graphics.use(Resources.StoryScene1.toSprite())
        this.storyscene1.pos = new Vector(720, 450)
        this.storyscene1.scale = new Vector (10, 10)
        this.add(this.storyscene1)
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene2.toSprite()) }, 12000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene3.toSprite()) }, 21000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene4.toSprite()) }, 26000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene5.toSprite()) }, 32000) 
        setTimeout(() => { this.storyscene1.graphics.use(Resources.StoryScene2.toSprite()) }, 52000) 
        setTimeout(() => { this.game.goToControlScene()}, 57000) 
        
        
        

    }
    onPreUpdate(){
        
    }      
    
    
}