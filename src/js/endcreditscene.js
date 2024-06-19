import { BoundingBox, Scene, Vector, Actor,} from "excalibur"

import { Resources, ResourceLoader } from './resources.js'

export class EndcreditScene extends Scene {

    game
    endcredit

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
      

        

        this.endcredit = new Actor()
        this.endcredit.graphics.use(Resources.Endcredits.toSprite())
        Resources.Mainthemesound.play()
        this.endcredit.pos = new Vector(720, 3500)
        this.endcredit.vel = new Vector(0,-150)
        this.endcredit.scale = new Vector (0.3,0.3)
        this.add(this.endcredit)

        

    }

    onPreUpdate(){
        if (this.endcredit.pos.y < -2600) {  
            this.game.goToStartScene();  
        }
    }

        
        

       
}