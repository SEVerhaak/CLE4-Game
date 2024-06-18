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
import { TopHat } from "./hats/tophat.js";
import { ChristmasHat } from "./hats/christmashat.js";
import { GraduationHat } from "./hats/graduationhat.js";
import { SombreroHat } from "./hats/sombrerohat.js";
import { WizardHat } from "./hats/wizardhat.js";
import { PrideHat } from "./hats/pridehat.js";



export class Chest extends Actor {

    game
    scene
    chestopened

    constructor(x, y, scene) {
        super({
            width: 48, height: 32, collisionType: CollisionType.Passive, x: x, y: y, z: 20
        });
        this.scale = new Vector(1, 1);
        this.scene = scene;
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
        this.on('collisionstart', (evt) => this.onCollisionStart(evt, this.scene));
    }
    getRandomNumber(x, y) {
        // Maak een nieuwe instantie van de Random class
        const random = new Random();

        // Genereer een willekeurig getal tussen 0 en 11
        const randomNumber = random.integer(x, y);

        return randomNumber;
    }

    // Voorbeeld van het 


    onCollisionStart(evt, chest) {
        if (evt.other instanceof Player) {
            if (!(this.chestopened)) {
                let tophat = new TopHat(-3, -2)
                let christmasHat = new ChristmasHat(-3, -2)
                let graduationHat = new GraduationHat(-3, -2)
                let sombreroHat = new SombreroHat(-3, -2)
                let wizardhat = new WizardHat(-3, -2)
                let prideHat = new PrideHat(-3, -2)
                let hats = [tophat, christmasHat, graduationHat, sombreroHat, wizardhat, prideHat]
                this.graphics.use(this.chestOpen)
                this.addChild(hats[this.getRandomNumber(0, 5)])
            }
            this.chestopened = true
        }
        if (evt.other instanceof Flower) {
            evt.other.kill();
        }
    }





    onPreUpdate(engine, delta) {

    }


}