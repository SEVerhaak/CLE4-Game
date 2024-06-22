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
import {Resources, ResourceLoader} from './resources.js'
import {Player} from "./player.js";
import {Flower} from "./flowers.js";
import {Chest} from "./chest.js";
import {ProjectilePickup} from "./pickups/pickupProjectileTest.js";
import {FireProjectile2Pickup} from "./pickups/FireProjectile2Pickup.js";
import {HealthPickup} from "./pickups/healthPickup.js";
import {FireProjectile3Pickup} from "./pickups/FireProjectile3Pickup.js";
import {NectarPickup} from "./pickups/nectarPickup.js";
import {Glow} from "./glow.js";


export class Bush extends Actor {
    bushes
    glow

    constructor(x, y) {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, x: x, y: y, z: 20
        });
        this.scale = new Vector(1, 1);
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.glow = new Glow()
        this.addChild(this.glow)
        this.glow.scale = new Vector(0.75, 0.75)
        this.glow.pos = new Vector(0, 0)
        this.glow.z = 79
        this.z = 80

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
        if (evt.other instanceof Player) {
            const randomXPositive = this.generateRandomNumber(30, 60)
            const randomYPositive = this.generateRandomNumber(30, 60)
            const randomSelector = randomIntInRange(1, 20)
            switch (randomSelector) {
                case 1:
                    const projectile = new ProjectilePickup(0, 0)
                    this.addChild(projectile)
                    projectile.actions.moveTo(new Vector(randomXPositive, randomYPositive), 50)
                    this.removeChild(this.glow)
                    this.body.collisionType = CollisionType.PreventCollision
                    break

                case 2:
                    const projectile2 = new FireProjectile2Pickup(0, 0)
                    this.addChild(projectile2)
                    projectile2.actions.moveTo(new Vector(randomXPositive, randomYPositive), 50)
                    this.removeChild(this.glow)
                    this.body.collisionType = CollisionType.PreventCollision
                    break

                case 3:
                    const projectile3 = new FireProjectile3Pickup(0, 0)
                    this.addChild(projectile3)
                    projectile3.actions.moveTo(new Vector(randomXPositive, randomYPositive), 50)
                    this.removeChild(this.glow)
                    this.body.collisionType = CollisionType.PreventCollision
                    break

                case 4:
                    const health = new HealthPickup(0, 0)
                    this.addChild(health)
                    health.actions.moveTo(new Vector(randomXPositive, randomYPositive), 50)
                    this.removeChild(this.glow)
                    this.body.collisionType = CollisionType.PreventCollision
                    break

                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                    for (let i = 0; i < this.generateRandomNumber(3, 6); i++) {
                        const randomXPositiveLoop = this.generateRandomNumber(30, 60)
                        const randomYPositiveLoop = this.generateRandomNumber(30, 60)
                        const nectar = new NectarPickup(0, 0)
                        this.addChild(nectar)
                        nectar.scale = new Vector(0.1, 0.1)
                        nectar.actions.moveTo(new Vector(randomXPositiveLoop, randomYPositiveLoop), 50)
                    }
                    this.removeChild(this.glow)
                    this.body.collisionType = CollisionType.PreventCollision
                    break

                default:
                    console.log('error spawning in item, case selector might not be an INT!')
            }
        }
    }

    onPreUpdate(engine, delta) {

    }


}