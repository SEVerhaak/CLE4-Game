import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType, Color, EmitterType,
    Engine,
    Graphic,
    Input,
    Keys, ParticleEmitter,
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

                this.spawnParticles()

                if (Math.random() < 0.5){
                    const nectar = new NectarPickup(0,0, evt.other)
                    this.addChild(nectar)
                    this.body.collisionType = CollisionType.PreventCollision
                    nectar.actions.moveTo(new Vector(randomXNegative, randomYNegative), 50)
                    this.removeChild(this.glow)
                } else{
                    const nectar = new NectarPickup(0,0, evt.other)
                    this.addChild(nectar)
                    this.body.collisionType = CollisionType.PreventCollision
                    nectar.actions.moveTo(new Vector(randomXPositive, randomYPositive), 50)
                    //evt.other.nectarUI.setScore()
                    this.removeChild(this.glow)
                }
            }
        }
    }

    spawnParticles(){
        let emitter = new ParticleEmitter(0,0,0,2);
        emitter.emitterType = EmitterType.Rectangle;
        emitter.radius = 5;
        emitter.minVel = 10;
        emitter.maxVel = 50;
        emitter.minAngle = 0;
        emitter.maxAngle = 6.2;
        emitter.isEmitting = true;
        emitter.emitRate = 56;
        emitter.opacity = 1;
        emitter.fadeFlag = true;
        emitter.particleLife = 1000;
        emitter.maxSize = 5;
        emitter.minSize = 0.5;
        emitter.startSize = 0;
        emitter.endSize = 0;
        emitter.acceleration = new Vector(0, 0);
        emitter.beginColor = Color.Orange;
        emitter.endColor = Color.Yellow;
        emitter.pos.y = -10
        emitter.z = 1000
        this.addChild(emitter);
        setTimeout(() => {
            //console.log('clearing')
            this.removeChild(emitter)
        }, 200);
    }


    onPreUpdate(engine, delta) {

    }


}