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


export class Bush extends Actor {
    bushes

    constructor(x, y) {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, x: x, y: y, z: 20
        });
        this.scale = new Vector(1, 1);
    }

    onInitialize(engine) {
        super.onInitialize(engine);


        this.bushes = [Resources.Bush1, Resources.Bush2, Resources.Bush3]
        const number = (this.getRandomNumber(0, 2))
        // standaard start animatie
        this.graphics.use(this.bushes[number].toSprite());
        this.on('precollision', (evt) => this.onCollisionStart(evt));
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
        if (evt.other instanceof Flower || evt.other instanceof Bush) {
            evt.other.kill();
        }
        if (evt.other instanceof Chest) {
            this.kill();
        }
    }





    onPreUpdate(engine, delta) {

    }


}