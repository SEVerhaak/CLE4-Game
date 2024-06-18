import { BoundingBox, Scene, Vector, Actor, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'


export class StartScene extends Scene {
    game

    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {

        const startScene = new Actor()
        startScene.graphics.use(Resources.StartScene.toSprite())
        startScene.pos = new Vector(720, 450)
        startScene.scale = new Vector(3.4, 3.4)
        this.add(startScene)


        engine.input.keyboard.on('press', (evt) => {
          if (evt.key === Input.Keys.Space) {
              this.game.goToStoryScene();
                
           }
        }); 
    }

}
