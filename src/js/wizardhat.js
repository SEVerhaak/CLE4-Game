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


export class WizardHat extends Actor {

    constructor() {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, x: -1, y: -8, z: 999
        });
        this.scale = new Vector(1, 1);
    }

    onInitialize(engine) {
        const spriteWizardHat = SpriteSheet.fromImageSource({
            image: Resources.WizardHat,
            grid: {
                rows: 9,
                columns: 6,
                spriteWidth: 60,
                spriteHeight: 60
            },

        })
        this.WizardFront = Animation.fromSpriteSheet(spriteWizardHat, range(0, 0), 100);        // standaard start animatie
        this.graphics.use(this.WizardFront);
        this.scale = new Vector(0.3, 0.3)
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