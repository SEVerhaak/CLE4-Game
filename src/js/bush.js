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
    soundArray = [Resources.InteractSFXOne, Resources.InteractSFXTwo, Resources.InteractSFXThree]

    constructor(x, y) {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, x: x, y: y, z: 20
        });
        this.scale = new Vector(1, 1);
    }


    onInitialize(engine) {
        super.onInitialize(engine);

        this.glow = new Glow()
        this.addChild(this.glow)
        this.glow.scale = new Vector(0.75, 0.75)
        this.glow.pos = new Vector(0, 0)
        this.glow.z = 79
        this.z = 81

        this.bushes = [Resources.Bush1, Resources.Bush2, Resources.Bush3]
        const number = (this.generateRandomNumber(0, 2))
        // standaard start animatie
        this.graphics.use(this.bushes[number].toSprite());
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    onCollisionStart(evt) {
        if (evt.other instanceof Flower || evt.other instanceof Bush) {
            evt.other.kill();
        }
        if (evt.other instanceof Chest) {
            this.kill();
        }
        if (evt.other instanceof Player) {
            this.spawnParticles()
            this.soundArray[this.generateRandomNumber(0,2)].play(0.5)
            Resources.NectarSFX.play(0.25)
            let randomXPositive = this.generateRandomNumber(30, 60)
            let randomYPositive = this.generateRandomNumber(30, 60)
            const randomSelector = this.generateRandomNumber(1, 20)

            if (Math.random() > 0.5) {
                randomYPositive *= -1
            } else if (Math.random() > 0.25) {
                randomXPositive *= -1
            } else {
                randomXPositive *= -1
                randomYPositive *= -1
            }

            if (Math.random() < 0.5) {
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
                    default:
                        console.log('error spawning in item, case selector might not be an INT!')
                }
            } else {
                for (let i = 0; i < this.generateRandomNumber(3, 6); i++) {
                    const randomXPositiveLoop = this.generateRandomNumber(30, 60)
                    let randomYPositiveLoop = this.generateRandomNumber(30, 60)
                    if (Math.random() < 0.5){
                        randomYPositiveLoop *= -1
                    }
                    const nectar = new NectarPickup(0, 0)
                    this.addChild(nectar)
                    nectar.scale = new Vector(0.5, 0.5)
                    nectar.actions.moveTo(new Vector(randomXPositiveLoop, randomYPositiveLoop), 50)
                }
                this.removeChild(this.glow)
                this.body.collisionType = CollisionType.PreventCollision
            }
        }
    }

    spawnParticles() {
        let emitter = new ParticleEmitter(0, 0, 0, 2);
        emitter.emitterType = EmitterType.Rectangle;
        emitter.radius = 5;
        emitter.minVel = 20;
        emitter.maxVel = 80;
        emitter.minAngle = 0;
        emitter.maxAngle = 6.2;
        emitter.isEmitting = true;
        emitter.emitRate = 300;
        emitter.opacity = 0.5;
        emitter.fadeFlag = true;
        emitter.particleLife = 1000;
        emitter.maxSize = 10;
        emitter.minSize = 1;
        emitter.startSize = 0;
        emitter.endSize = 0;
        emitter.acceleration = new Vector(0, 42);
        emitter.beginColor = Color.Chartreuse;
        emitter.endColor = Color.Green;
        emitter.scale = new Vector(0.5,0.5)
        emitter.z = 80
        this.addChild(emitter);
        setTimeout(() => {
            //console.log('clearing')
            this.removeChild(emitter)
        }, 200);
    }

}