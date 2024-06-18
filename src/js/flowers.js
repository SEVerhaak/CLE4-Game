import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType,
    Engine,
    Graphic,
    Input,
    Keys,
    Random, randomIntInRange,
    range,
    SpriteSheet,
    Vector
} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Glow} from "./glow.js";
import {Player} from "./player.js";
import {NectarPickup} from "./pickups/nectarPickup.js";


export class Flower extends Actor {

    glow
    game

    constructor(x, y, game) {
        super({
            width: 32, height: 32, collisionType: CollisionType.Passive, x: x, y: y
        });
        this.scale = new Vector(0.5, 0.5);
        this.z = 80
        this.game = game
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

        this.glow = new Glow()
        this.addChild(this.glow)
        this.glow.scale = new Vector(0.5, 0.5)
        this.glow.pos = new Vector(0, -5)
        this.glow.z = 79
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }
    getRandomNumber(x, y) {
        // Maak een nieuwe instantie van de Random class
        const random = new Random();

        // Genereer een willekeurig getal tussen 0 en 11
        const randomNumber = random.integer(x, y);

        return randomNumber;
    }

    // Voorbeeld van het 


    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Player) {
            //player position
            const playerPos = evt.other.pos

            const amount = this.generateRandomNumber(1,3)

            for (let i = 0; i < amount; i++) {
                const randomXNegative = this.generateRandomNumber(-40,-15)
                const randomYNegative = this.generateRandomNumber(-40,-15)
                const randomXPositive = this.generateRandomNumber(15,40)
                const randomYPositive = this.generateRandomNumber(15,40)

                if (Math.random() < 0.5){
                    const nectar = new NectarPickup(randomXNegative,randomYNegative, evt.other)
                    this.addChild(nectar)
                    this.body.collisionType = CollisionType.PreventCollision
                    this.glow.kill()
                } else{
                    const nectar = new NectarPickup(randomXPositive,randomYPositive, evt.other)
                    this.addChild(nectar)
                    this.body.collisionType = CollisionType.PreventCollision
                    evt.other.nectarUI.setScore()
                    this.glow.kill()
                }
            }
        }
    }

    onPreUpdate(engine, delta) {

    }


}