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


export class Chest extends Actor {

    constructor(x, y) {
        super({
            width: 48, height: 32, collisionType: CollisionType.Passive, x: x, y: y, z: 20
        });
        this.scale = new Vector(1, 1);
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const spriteSheetChests = SpriteSheet.fromImageSource({
            image: Resources.Chest, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 5,
                rows: 8,
                spriteWidth: 48,
                spriteHeight: 32
            },
        });

        const number = (this.getRandomNumber(0, 3) * 10)

        this.chestIdle = Animation.fromSpriteSheet(spriteSheetChests, range((0 + number), (4 + number)), 200);
        this.chestOpen = Animation.fromSpriteSheet(spriteSheetChests, range((5 + number), (9 + number)), 200, AnimationStrategy.Freeze);
        // standaard start animatie
        this.graphics.use(this.chestIdle);
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
        if (evt.other instanceof Player) {
            this.graphics.use(this.chestOpen)
        }
        if (evt.other instanceof Flower) {
            evt.other.kill();
        }
    }





    onPreUpdate(engine, delta) {

    }


}