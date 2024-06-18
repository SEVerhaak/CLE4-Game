import { Actor, Color, Vector, ScreenElement, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Healthbar extends ScreenElement {

    healthbar
    currentHealth
    background
    game
    enemy = false
    colour
    inventory

    constructor(game, enemy) {
        super();
        this.game = game;
        this.enemy = enemy
    }

    onInitialize(engine) {
        if (this.enemy){
            this.colour = Color.Red
        } else{
            this.colour = Color.Green
        }
        this.currentHealth = 1;
        this.background = new Actor({ x: 0, y: 0, color: Color.fromRGB(255, 255, 255, 0.4), width: 15, height: 1, anchor: Vector.Zero })
        this.background.z = 666
        this.addChild(this.background)
        this.healthbar = new Actor({ x: 0, y: 0, color: this.colour, width: 15, height: 1, anchor: Vector.Zero })
        this.addChild(this.healthbar)
        this.healthbar.z = 666


        this.body.collisionType = CollisionType.PreventCollision
        this.healthbar.body.collisionType = CollisionType.PreventCollision
        this.background.body.collisionType = CollisionType.PreventCollision

        //this.setHealth(this.inventory.health)
        //this.healthTimer();
    }

    reduceHealth(amount) {
        if (this.currentHealth <= 0) {
            // player dead
        } else {
            this.healthbar.scale = new Vector(this.currentHealth - amount, 1) // de health is nu 50%
            this.currentHealth = this.currentHealth - amount
            if (this.currentHealth > 0) {
                // player also dead
            }
        }
    }


    healthTimer(initHealth) {
        setTimeout(() => {
            this.setHealth(initHealth)
        }, 50)
    }

    setHealth(value){
        this.healthbar.scale =  new Vector(value, 1)
        this.currentHealth = value
    }

    increaseHealth(amount) {
        if (this.currentHealth >= 1) {
            // player fully healed
        } else {
            this.healthbar.scale = new Vector(this.currentHealth + amount, 1) // de health is nu 50%
            this.currentHealth = this.currentHealth + amount
            if (this.currentHealth >= 1) {
                // player also dead
            }
        }
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }
}