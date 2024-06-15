import {
    Actor,
    Engine,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";

export class Inventory extends Actor {

    inventory = [];
    projectiles = [];
    currentSelectedItemIndex = 0
    activeProjectileIndex = -1

    constructor(engine,x,y) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }

    onInitialize(engine) {

    }

    addItem(item, isProjectile, projectileIndex){
        if (isProjectile){
            let projectileObject = {
                itemName: item,
                projectileIndex: projectileIndex // projectileindex is de index in de player projectile array
            }
            this.projectiles.push(projectileObject)
        }else{
            this.inventory.push(item);
        }
        console.log("inventory: " + this.inventory)
        console.log(this.projectiles)
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
        if (this.currentSelectedItemIndex === this.projectiles.length){
            this.currentSelectedItemIndex = 0
        } else{
            this.currentSelectedItemIndex++
        }
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
