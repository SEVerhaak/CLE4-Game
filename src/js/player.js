import {
    Actor,
    Engine, Keys,
    Vector
} from "excalibur";
import {Resources, ResourceLoader} from './resources.js'

export class Player extends Actor {
    // keyPressArray up, down, left, right
    keyPressArray = [0,0,0,0];
    // speler snelheid
    playerSpeed = 100;

    constructor() {
        super();
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.graphics.use(Resources.Fish.toSprite());
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        // vector voor de snelheid
        let velocity = new Vector(0, 0);

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            velocity.y = -this.playerSpeed;
            this.keyPressArray[0] = 1;
        } else{
            this.keyPressArray[0] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            velocity.y = this.playerSpeed;
            this.keyPressArray[1] = 1;
        } else {
            this.keyPressArray[1] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            velocity.x = -this.playerSpeed;
            this.keyPressArray[2] = 1;
        } else {
            this.keyPressArray[2] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            velocity.x = this.playerSpeed;
            this.keyPressArray[3] = 1;
        } else {
            this.keyPressArray[3] = 0;
        }

        // Normaliseer de snelheid zodat schuin bewegen dezelfde snelheid als normaal heeft.
        if (velocity.x !== 0 || velocity.y !== 0) {
            velocity = velocity.normalize().scale(new Vector(this.playerSpeed, this.playerSpeed));
        }

        this.vel = velocity;
    }
}