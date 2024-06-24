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
    level

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
            // maak projectile object aan
            let projectileObject = {
                itemName: item, // naam (string)
                projectileIndex: projectileIndex, // projectileindex is de index in de player projectile array
                projectileSprite: projectileSprite, // sprite
                endFrame: endFrame // laatste frame van de animatie van het projectiel
            }
            // voeg het projectile object toe aan de projectiles array
            this.projectiles.push(projectileObject)
        }else if (isHat){
            // wordt niet meer gebruikt maar stelt de laatst opgepakte hoed in
            this.lastHat = item
        } else{
            // check of item al in inventory toegevoegd is
            let existingItem = this.inventory.find(inventoryItem => inventoryItem.itemName === item);
            if (existingItem) {
                // als het item al bestaat zorg ervoor dat de hoeveelheid toeneemt
                this.increaseItemAmount(existingItem)
            } else {
                // maak item object aan
                 let itemObject = {
                    itemName: item,
                    itemAmount: 1
                };
                // voeg het item toe aan de inventory array
                this.inventory.push(itemObject);
                // zorg dat de hoeveelheid van nectar/supernectar omhoog gaat
                this.increaseItemAmount(itemObject)
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

    checkIfProjectileIsEquipped(item){
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].itemName === item){
                console.log('item found')
                return true
            }
        }
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
