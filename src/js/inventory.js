import {
    Actor,
    Engine,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";

export class Inventory extends Actor {
    game
    inventory = [];
    projectiles = [];
    currentSelectedItemIndex = 0
    activeProjectileIndex = -1
    currentSelectedProjectileSprite

    constructor(game) {
        super({ width: 16, height: 16, collisionType: CollisionType.PreventCollision});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = 400;
        this.pos.y = 400;
        this.z = 99;
        this.game = game
    }

    onInitialize(engine) {
        //this.graphics.use(this.currentSelectedProjectileSprite)
    }

    setSprite(){
        this.currentSelectedProjectileSprite = this.projectiles[this.currentSelectedItemIndex].projectileSprite

        this.graphics.use(this.currentSelectedProjectileSprite.toSprite())
    }

    addItem(item, isProjectile, projectileIndex, projectileSprite){
        if (isProjectile){
            let projectileObject = {
                itemName: item,
                projectileIndex: projectileIndex, // projectileindex is de index in de player projectile array
                projectileSprite: projectileSprite
            }
            console.log(projectileObject)
            this.projectiles.push(projectileObject)
        }else{
            this.inventory.push(item);
        }
        console.log("inventory: " + this.inventory)
        console.log(this.projectiles)
    }

    checkIfProjectileIsEquipped(item){
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].itemName === item){
                console.log('item found')
                return true
            }
        }
    }

    selectItem(index){
        return this.inventory[index]
    }

    getSelectedProjectileId(){
        if (this.projectiles.length > 0){
            return this.projectiles[this.currentSelectedItemIndex].projectileIndex
        } else{
            return -1
        }
    }

    setSelectedProjectileID(){
        if (this.currentSelectedItemIndex >= this.projectiles.length - 1){
            this.currentSelectedItemIndex = 0
        } else{
            this.currentSelectedItemIndex++
        }
        //this.setSprite();
        console.log(this.currentSelectedItemIndex)
    }

    removeItem(itemName){
        const index = this.inventory.findIndex(item => item === itemName);
        if (index !== -1) {
            const removedItem = this.inventory.splice(index, 1)[0];
            console.log("Removed from inventory: " + removedItem);
        } else {
            console.log("Item not found in inventory: " + itemName);
        }
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

    }
}
