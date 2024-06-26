import {
    Actor,
    Vector,
    CollisionType, Sprite
} from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";
import { Pickup } from "./pickup.js";

export class NectarPickup extends Pickup {

    sprite = new Sprite({
        image: Resources.MiniNectar,
    })
    itemName = 'Nectar'
    scaleVec = new Vector(1, 1)

    constructor(x, y) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive });
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }

    onInitialize(engine) {
        this.graphics.use(this.sprite)
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.spawnDelay();
    }
}
