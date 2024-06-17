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


export class Flower extends Actor {

    constructor(x, y) {
        super({
            width: 32, height: 32, collisionType: CollisionType.Passive, x: x, y: y, z: 20
        });
        this.scale = new Vector(0.5, 0.5);
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        const spriteSheetFlowers = SpriteSheet.fromImageSource({
            image: Resources.Flowers, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 6,
                rows: 2,
                spriteWidth: 32,
                spriteHeight: 32
            },
        });

        const number = this.getRandomNumber(0, 11)

        // laad bewegings animaties in
        this.flower = Animation.fromSpriteSheet(spriteSheetFlowers, range(number, number), 100);
        // standaard start animatie
        this.graphics.use(this.flower);
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

    }





    onPreUpdate(engine, delta) {

    }


}