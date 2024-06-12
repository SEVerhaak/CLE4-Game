import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType,
    Engine,
    Input,
    Keys,
    range,
    SpriteSheet,
    Vector
} from "excalibur";
import {Resources, ResourceLoader} from './resources.js'
import {Healthbar} from "./healthBar.js";

export class Player extends Actor {
    // keyPressArray up, down, left, right
    keyPressArray = [0, 0, 0, 0];
    // speler snelheid
    playerSpeed = 100;

    lastPressed

    healthBar

    attacking = false;

    animationLeft
    animationRight
    animationUp
    animationDown
    animationIdleLeft
    animationIdleRight
    animationIdleUp
    animationIdleDown
    animationAtackLeft
    animationAtackRight
    animationAtackUp
    animationAtackDown


    constructor() {
        super({
            width: 16, height: 16, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(1.5, 1.5);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.healthBar = new Healthbar();
        this.addChild(this.healthBar);
        this.healthBar.pos = new Vector(-8,-17);

        this.collider.useBoxCollider(
            16,
            16,
            new Vector(0, 0),
            new Vector(-9, -14)
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

        const spriteSheetAttack = SpriteSheet.fromImageSource({
            image: Resources.BeeAttack, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 4,
                rows: 4,
                spriteWidth: 64,
                spriteHeight: 64
            },
        });

        // laad bewegings animaties in
        this.animationLeft = Animation.fromSpriteSheet(spriteSheetWalk, range(4, 7), 100);
        this.animationRight = Animation.fromSpriteSheet(spriteSheetWalk, range(8, 11), 100);
        this.animationUp = Animation.fromSpriteSheet(spriteSheetWalk, range(0, 3), 100);
        this.animationDown = Animation.fromSpriteSheet(spriteSheetWalk, range(12, 15), 100);

        // laad idle animaties in
        this.animationIdleLeft = Animation.fromSpriteSheet(spriteSheetIdle, range(4, 7), 100);
        this.animationIdleRight = Animation.fromSpriteSheet(spriteSheetIdle, range(8, 11), 100);
        this.animationIdleUp = Animation.fromSpriteSheet(spriteSheetIdle, range(0, 3), 100);
        this.animationIdleDown = Animation.fromSpriteSheet(spriteSheetIdle, range(12, 15), 100);

        // laad atack animaties in
        this.animationAtackLeft = Animation.fromSpriteSheet(spriteSheetAttack, range(4, 7), 100, AnimationStrategy.Loop);
        this.animationAtackRight = Animation.fromSpriteSheet(spriteSheetAttack, range(8, 11), 100, AnimationStrategy.Loop);
        this.animationAtackUp = Animation.fromSpriteSheet(spriteSheetAttack, range(0, 3), 100, AnimationStrategy.Loop);
        this.animationAtackDown = Animation.fromSpriteSheet(spriteSheetAttack, range(12, 15), 100, AnimationStrategy.Loop);

        // standaard start animatie
        this.graphics.use(this.animationIdleRight);
    }

    add(accumulator, a) {
        return accumulator + a;
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        // check om te kijken of er geen knoppen ingedrukt worden (De som van de array moet 0 zijn en dan wordt er niks ingedrukt)
        const arraySum = this.keyPressArray.reduce(this.add, 0);
        // speel idle animaties
        if (arraySum <= 0 && this.attacking === false) {
            switch (this.lastPressed) {
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
        // controller logic
        let xAxis = engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX);
        let yAxis = engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY);


        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up) || yAxis < -0.5) {
            velocity.y = -this.playerSpeed;
            this.keyPressArray[0] = 1;
            this.graphics.use(this.animationUp);
            this.lastPressed = 'up'
        } else {
            this.keyPressArray[0] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down) || yAxis > 0.5) {
            velocity.y = this.playerSpeed;
            this.keyPressArray[1] = 1;
            this.graphics.use(this.animationDown);
            this.lastPressed = 'down'

        } else {
            this.keyPressArray[1] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left) || xAxis < -0.5) {
            velocity.x = -this.playerSpeed;
            this.keyPressArray[2] = 1;
            this.graphics.use(this.animationLeft);
            this.lastPressed = 'left'

        } else {
            this.keyPressArray[2] = 0;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right) || xAxis > 0.5) {
            velocity.x = this.playerSpeed;
            this.keyPressArray[3] = 1;
            this.graphics.use(this.animationRight);
            this.lastPressed = 'right'
        } else {
            this.keyPressArray[3] = 0;
        }

        if (engine.input.keyboard.wasPressed(Keys.Space) ||
            engine.input.gamepads.at(0).wasButtonPressed(Input.Buttons.Face1) || this.attacking
        ) {
            // attack anim
            console.log('pressed spacebar')
            switch (this.lastPressed) {
                case 'up':
                    this.attacking = true
                    this.graphics.use(this.animationAtackUp);
                    this.animationAtackUp.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break;
                case 'down':
                    this.attacking = true
                    this.graphics.use(this.animationAtackDown);
                    this.animationAtackDown.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break;
                case 'left':
                    this.attacking = true
                    this.graphics.use(this.animationAtackLeft);
                    this.animationAtackLeft.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break;
                case 'right':
                    this.attacking = true
                    this.graphics.use(this.animationAtackRight);
                    this.animationAtackRight.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break;
            }

        }

        // Normaliseer de snelheid zodat schuin bewegen dezelfde snelheid als normaal heeft.
        if (velocity.x !== 0 || velocity.y !== 0) {
            velocity = velocity.normalize().scale(new Vector(this.playerSpeed, this.playerSpeed));
        }

        this.vel = velocity;
    }

    startAttackAnimation(direction) {

    }
}