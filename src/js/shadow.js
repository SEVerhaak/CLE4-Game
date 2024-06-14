import {
    Actor,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";

export class Shadow extends Actor {

    sprite = this.graphics.use(Resources.Nectar.toSprite())
    scaleVec = new Vector(1, 1)

    constructor() {
        super({ width: 8, height: 8, collisionType: CollisionType.PreventCollision});
        this.z = 9;
    }

    onInitialize(engine) {
        this.scale = this.scaleVec
        this.sprite = this.graphics.use(Resources.Shadow.toSprite())
    }
}
