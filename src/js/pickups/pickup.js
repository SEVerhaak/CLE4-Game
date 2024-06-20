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
    isSuperNectar = false;

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
        } else if (this.isSuperNectar) {
            console.log('suPernectar opgepakt')
            this.kill()
            player.inventory.addItem(this.itemName, false)
            player.updateNectarScore();
            player.updateTaskBar()
        } else if (this.itemName === 'Health'){
            if (player.inventory.health <= 0.9){
                player.healthBar.increaseHealth(0.1)
                this.kill()
            } else if (player.inventory.health > 0.9 && player.inventory.health < 1){
                player.healthBar.setHealth(1)
                this.kill()
            } else{
                this.kill()
            }
        }
        else {
            player.updateNectarScore();
            player.taskBarUI.updateTasks();
            player.inventory.addItem(this.itemName, false)
            this.kill();
        }
    }

    spawnDelay() {
        setTimeout(() => {
            this.body.collisionType = CollisionType.Passive
        }, 1000);
    }

}
