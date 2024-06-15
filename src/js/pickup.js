import {
    Actor,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";

export class Pickup extends Actor {

    sprite = this.graphics.use(Resources.Nectar.toSprite())
    itemName = 'Placeholder'
    scaleVec = new Vector(0.005, 0.005)
    isProjectile = false;
    projectileIndex

    constructor(x,y ) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }

    onInitialize(engine) {
        this.scale = this.scaleVec
        this.sprite = this.graphics.use(Resources.Nectar.toSprite())
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

    }

    onCollisionStart(evt) {
        if (evt.other instanceof Player) {
            this.onPlayerCollision(evt.other);
        }
    }

    onPlayerCollision(player) {
        if (this.isProjectile){
            player.inventory.addItem(this.itemName, true, this.projectileIndex)
        } else{
            player.inventory.addItem(this.itemName, false, null)
        }
        this.kill();
    }
}
