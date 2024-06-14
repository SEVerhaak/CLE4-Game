import { BoundingBox, Scene, Vector, Actor,} from "excalibur"

import { Resources, ResourceLoader } from './resources.js'

export class EndcreditScene extends Scene {

    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
      

        

        const endcredit = new Actor()
        endcredit.graphics.use(Resources.Endcredits.toSprite())
        endcredit.pos = new Vector(720, 3500)
        endcredit.vel = new Vector(0,-150)
        endcredit.scale = new Vector (0.3,0.3)
        this.add(endcredit)
        

    }

        
        

       
}