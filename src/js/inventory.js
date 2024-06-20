import {
    Actor,
    Engine,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";
import {Transparenthat} from "./hats/transparenthat.js";

export class Inventory extends Actor {
    game
    inventory = [];
    projectiles = [];
    hats = [null];
    lastHat
    currentSelectedItemIndex = 0
    hatIndex = 0
    activeProjectileIndex = -1
    currentSelectedProjectileSprite
    health
    nectarAmount = 0;
    superNecterAmount = 0;

    constructor(game) {
        super({ width: 16, height: 16, collisionType: CollisionType.PreventCollision});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = 400;
        this.pos.y = 400;
        this.z = 99;
        this.game = game
        this.health = 1;
        //this.nectarAmount = 0;
    }

    onInitialize(engine) {
        //this.graphics.use(this.currentSelectedProjectileSprite)
    }

    setSprite(){
        this.currentSelectedProjectileSprite = this.projectiles[this.currentSelectedItemIndex].projectileSprite

        this.graphics.use(this.currentSelectedProjectileSprite.toSprite())
    }

    addItem(item, isProjectile, projectileIndex, projectileSprite, endFrame, isHat){
        if (isProjectile){
            let projectileObject = {
                itemName: item,
                projectileIndex: projectileIndex, // projectileindex is de index in de player projectile array
                projectileSprite: projectileSprite,
                endFrame: endFrame
            }
            console.log(projectileObject)
            this.projectiles.push(projectileObject)
        }else if (isHat){
            this.lastHat = item
            console.log(this.hats)
        } else{
            let existingItem = this.inventory.find(inventoryItem => inventoryItem.itemName === item);

            if (existingItem) {
                this.increaseItemAmount(existingItem)
            } else {
                 let itemObject = {
                    itemName: item,
                    itemAmount: 1
                };
                this.inventory.push(itemObject);
                this.increaseItemAmount(itemObject)
                //player.updateNectarScore()
                //this.setItemAmount(itemObject)
                console.log(this.inventory)
            }
        }
    }

    increaseItemAmount(item){
        console.log(item)
        if (item.itemName === 'Nectar'){
            this.nectarAmount++
        } else{
            this.superNecterAmount++
        }
    }

    setItemAmount(item){
        let existingItem = this.inventory.find(inventoryItem => inventoryItem.itemName === item);
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

    setSelectedHatID(){
        if (this.hatIndex >= this.hats.length - 1){
            this.hatIndex = 0
        } else{
            this.hatIndex++
        }
        //this.setSprite();
        console.log(this.hatIndex)
    }

    getSelectedHatID(){
        return this.hatIndex
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
        console.log(this.health)
    }
}
