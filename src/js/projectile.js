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

    sprite
    directionX
    directionY
    velocity

    constructor(velocity) {
        super({ width: 8, height: 8, collisionType: CollisionType.PreventCollision});
        this.scale = new Vector(0.005, 0.005);
        this.vel = velocity
        this.z = 999
        console.log(velocity)
    }

    onInitialize(engine) {
        //this.pos = new Vector(this.x, this.y);
        this.sprite = this.graphics.use(Resources.Nectar.toSprite())
        //this.vel = new Vector(this.directionX * this.velocity, this.directionY * this.velocity);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

    }
}
