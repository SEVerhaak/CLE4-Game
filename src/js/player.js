import {
    Actor,
    Engine, Keys,
    Vector
} from "excalibur";
import {Resources, ResourceLoader} from './resources.js'

export class Player extends Actor {
    keyPressArray = [0,0,0,0];

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
        // speler snelheid
        const speed = 100;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            velocity.y = -speed;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            velocity.y = speed;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            velocity.x = speed;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            velocity.x = -speed;
        }

        // Normaliseer de snelheid zodat schuin bewegen dezelfde snelheid als normaal heeft.
        if (velocity.x !== 0 || velocity.y !== 0) {
            velocity = velocity.normalize().scale(new Vector(speed, speed));
        }

        this.vel = velocity;
    }
}