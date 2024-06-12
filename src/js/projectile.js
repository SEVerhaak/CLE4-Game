import {
    Actor,
    Engine,
    Vector,
    SpriteSheet,
    Animation,
    range,
    AnimationStrategy,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";

export class Projectile extends Actor {

    sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.1


    constructor(velocity) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        this.scale = new Vector(0.003, 0.003);
        this.vel = velocity
        this.z = 999
        console.log(velocity)
    }

    onInitialize(engine) {
        this.sprite = this.graphics.use(Resources.Nectar.toSprite())
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

    }
}
