import {
    Actor,
    Vector,
    CollisionType
} from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class Pickup extends Actor {

    sprite
    itemName = 'Placeholder'
    scaleVec = new Vector(0.005, 0.005)
    isProjectile = false;
    projectileIndex
    projectileSprite
    endFrame
    playerInstance

    constructor(x, y, player) {
        super({ width: 8, height: 8, collisionType: CollisionType.PreventCollision });
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
        this.playerInstance = player
    }

    onInitialize(engine) {
        console.log(this.sprite)
        this.scale = this.scaleVec
        this.graphics.use(this.sprite.toSprite())
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.spawnDelay();
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
        if (this.isProjectile) {
            if (!player.inventory.checkIfProjectileIsEquipped(this.itemName)) {
                player.inventory.addItem(this.itemName, true, this.projectileIndex, this.projectileSprite, this.endFrame)
                player.currentProjectileUI.setIcon(player.inventory.projectiles[player.inventory.currentSelectedItemIndex].projectileSprite, 3)
                this.kill();
            } else {
                // item zit dan al in de inventory niks meer me doen
            }
        } else {
            player.updateNectarScore();
            player.inventory.addItem(this.itemName, false)
            this.kill();
        }
    }

    spawnDelay() {
        setTimeout(() => {
            this.body.collisionType = CollisionType.Passive
        }, 500);
    }

}
