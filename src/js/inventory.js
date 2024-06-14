import {
    Actor,
    Engine,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";

export class Inventory extends Actor {

    inventory = [];

    constructor(engine,x,y) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }

    onInitialize(engine) {

    }

    addItem(item){
        this.inventory.push(item);
        console.log("inventory: " + item)
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
