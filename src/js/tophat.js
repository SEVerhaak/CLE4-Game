import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType,
    Engine,
    Graphic,
    Input,
    Keys,
    Random,
    range,
    SpriteSheet,
    Vector
} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { Player } from "./player.js";
import { Flower } from "./flowers.js";
import { Chest } from "./chest.js";


export class TopHat extends Actor {

    constructor() {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, x: -6.5, y: -11, z: 999
        });
        this.scale = new Vector(1, 1);
    }

    onInitialize(engine) {
        const spriteTopHat = SpriteSheet.fromImageSource({
            image: Resources.TopHat,
            grid: {
                rows: 9,
                columns: 6,
                spriteWidth: 70,
                spriteHeight: 70
            },

        })
        this.topHatFront = Animation.fromSpriteSheet(spriteTopHat, range(0, 0), 100);        // standaard start animatie
        this.graphics.use(this.topHatFront);
        this.scale = new Vector(0.5, 0.5)
    }
    getRandomNumber(x, y) {
        // Maak een nieuwe instantie van de Random class
        const random = new Random();

        // Genereer een willekeurig getal tussen 0 en 11
        const randomNumber = random.integer(x, y);

        return randomNumber;
    }

    // Voorbeeld van het 


    onCollisionStart(evt) {

    }





    onPreUpdate(engine, delta) {

    }


}