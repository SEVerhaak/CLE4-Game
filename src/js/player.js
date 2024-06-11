import {Actor, Animation, CollisionType, Engine, Keys, range, SpriteSheet, Vector} from "excalibur";
import {Resources, ResourceLoader} from './resources.js'

export class Player extends Actor {
    // keyPressArray up, down, left, right
    keyPressArray = [0,0,0,0];
    // speler snelheid
    playerSpeed = 100;

    lastPressed

    animationLeft
    animationRight
    animationUp
    animationDown
    animationIdleLeft
    animationIdleRight
    animationIdleUp
    animationIdleDown


    constructor() {
        super({
            width: 16, height: 16, collisionType: CollisionType.Active
        });
        this.scale = new Vector(4, 4);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.collider.useBoxCollider(
            16,
            16,
            new Vector (0,0),
            new Vector (-9,-14)
        )

        // spritesheets
        const spriteSheetIdle = SpriteSheet.fromImageSource({
            image: Resources.BeeIdle, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 4,
                rows: 4,
                spriteWidth: 64,
                spriteHeight: 64
            },
        });

        // spritesheets
        const spriteSheetWalk = SpriteSheet.fromImageSource({
            image: Resources.BeeWalk, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 4,
                rows: 4,
                spriteWidth: 64,
                spriteHeight: 64
            },
        });

        // laad bewegings animaties in
        this.animationLeft = Animation.fromSpriteSheet(spriteSheetWalk, range(4, 7), 100);
        this.animationRight = Animation.fromSpriteSheet(spriteSheetWalk, range(9, 11), 100);
        this.animationUp = Animation.fromSpriteSheet(spriteSheetWalk, range(0, 3), 100);
        this.animationDown = Animation.fromSpriteSheet(spriteSheetWalk, range(12, 15), 100);

        // laad idle animaties in
        this.animationIdleLeft = Animation.fromSpriteSheet(spriteSheetIdle, range(4, 7), 100);
        this.animationIdleRight = Animation.fromSpriteSheet(spriteSheetIdle, range(9, 11), 100);
        this.animationIdleUp = Animation.fromSpriteSheet(spriteSheetIdle, range(0, 3), 100);
        this.animationIdleDown = Animation.fromSpriteSheet(spriteSheetIdle, range(12, 15), 100);

        // standaard start animatie
        this.graphics.use(this.animationIdleRight);
    }

    add(accumulator, a){
        return accumulator + a;
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const arraySum = this.keyPressArray.reduce(this.add, 0);

        if (arraySum <= 0) {
            switch (this.lastPressed){
                case 'up':
                    this.graphics.use(this.animationIdleUp);
                    break;
                case 'down':
                    this.graphics.use(this.animationIdleDown);
                    break;
                case 'left':
                    this.graphics.use(this.animationIdleLeft);
                    break;
                case 'right':
                    this.graphics.use(this.animationIdleRight);
                    break;
            }
        }

        // vector voor de snelheid
        let velocity = new Vector(0, 0);

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            velocity.y = -this.playerSpeed;
            this.keyPressArray[0] = 1;
            this.graphics.use(this.animationUp);
            this.lastPressed = 'up'
        } else{
            this.keyPressArray[0] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            velocity.y = this.playerSpeed;
            this.keyPressArray[1] = 1;
            this.graphics.use(this.animationDown);
            this.lastPressed = 'down'

        } else {
            this.keyPressArray[1] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            velocity.x = -this.playerSpeed;
            this.keyPressArray[2] = 1;
            this.graphics.use(this.animationLeft);
            this.lastPressed = 'left'

        } else {
            this.keyPressArray[2] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            velocity.x = this.playerSpeed;
            this.keyPressArray[3] = 1;
            this.graphics.use(this.animationRight);
            this.lastPressed = 'right'
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