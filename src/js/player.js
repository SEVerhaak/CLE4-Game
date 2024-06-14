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
import {Projectile} from "./projectile.js";
import { Enemy } from "./enemy.js";
import {Inventory} from "./inventory.js";
import {Shadow} from "./shadow.js";
import {FireProjectile1} from "./fireProjectile1.js";


export class Player extends Actor {
    // keyPressArray up, down, left, right
    keyPressArray = [0, 0, 0, 0];
    // speler snelheid
    playerSpeed = 100;

    projectileSpeed = 125;
    projectileSpeedModifier = 1.2;

    lastPressed = 'right'

    inventory
    shadow
    healthBar
    health = 1;

    attacking = false;
    canShoot = true;
    invertShootDirectionUpDown = false;
    invertShootDirectionLeftRight = false;

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
    game


    constructor(game) {
        super({
            width: 16, height: 16, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(1.5, 1.5);
        this.game = game;
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.inventory = new Inventory(engine,0,0)
        this.addChild(this.inventory);

        this.healthBar = new Healthbar(this.game, false);
        this.addChild(this.healthBar);
        this.healthBar.pos = new Vector(-8, -17);

        this.shadow = new Shadow()
        this.shadow.pos = new Vector(-2, 5);
        this.shadow.graphics.opacity = 0.5
        this.addChild(this.shadow);

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
        const spriteSheetDeath = SpriteSheet.fromImageSource({
            image: Resources.BeeDeath, // BubbleImage should be an instance of the image resource
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
        this.animationDeath = Animation.fromSpriteSheet(spriteSheetDeath, range(0, 3), 100, AnimationStrategy.Freeze)

        // standaard start animatie
        this.graphics.use(this.animationIdleRight);
        this.on('precollision', (evt) => this.onCollisionStart(evt));
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Enemy) {
            this.health -= 0.005;
            this.healthBar.reduceHealth(0.005);
            console.log(this.health)
            if (this.health <= 0.01) {
                this.graphics.use(this.animationDeath);
                this.healthBar.kill();
                this.body.collisionType = CollisionType.PreventCollision
                this.animationDeath.events.on('end', (a) => {
                    this.timerOverWorld();
                })
            }
        }
    }

    add(accumulator, a) {
        return accumulator + a;
    }

    onPreUpdate(engine, delta) {
        if (this.health > 0.01) {
            super.onPreUpdate(engine, delta);
            // check om te kijken of er geen knoppen ingedrukt worden (De som van de array moet 0 zijn en dan wordt er niks ingedrukt)
            const arraySum = this.keyPressArray.reduce(this.add, 0);
            // speel idle animaties
            if (arraySum <= 0) {
                this.idleAnim();
            }

            // vector voor de snelheid
            let velocity = new Vector(0, 0);
            // controller logic
            let xAxis = engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX);
            let yAxis = engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY);


            if ((engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up) || yAxis < -0.5) && !engine.input.keyboard.isHeld(Keys.Down)) {
                velocity.y = -this.playerSpeed;
                this.movementAnim('up')
                this.keyPressArray[0] = 1;
                this.lastPressed = 'up'
            } else {
                this.keyPressArray[0] = 0;
            }

            if ((engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down) || yAxis > 0.5) && !engine.input.keyboard.isHeld(Keys.Up)) {
                velocity.y = this.playerSpeed;
                this.movementAnim('down')
                this.keyPressArray[1] = 1;
                this.graphics.use(this.animationDown);
                this.lastPressed = 'down'
            } else {
                this.keyPressArray[1] = 0;
            }

            this.invertShootDirectionUpDown = (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down) || yAxis > 0.5) && (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up) || yAxis < -0.5);
            this.invertShootDirectionLeftRight = (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left) || xAxis < -0.5) && (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right) || xAxis > 0.5);

            if ((engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left) || xAxis < -0.5) && !engine.input.keyboard.isHeld(Keys.Right)) {
                velocity.x = -this.playerSpeed;
                this.movementAnim('left')
                this.keyPressArray[2] = 1;
                this.graphics.use(this.animationLeft);
                this.lastPressed = 'left'

            } else {
                this.keyPressArray[2] = 0;
            }

            if ((engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right) || xAxis > 0.5) && !engine.input.keyboard.isHeld(Keys.Left))  {
                velocity.x = this.playerSpeed;
                this.movementAnim('right')
                this.keyPressArray[3] = 1;
                this.graphics.use(this.animationRight);
                this.lastPressed = 'right'
            } else {
                this.keyPressArray[3] = 0;
            }

            if (engine.input.keyboard.wasPressed(Keys.Space) ||
                engine.input.gamepads.at(0).wasButtonPressed(Input.Buttons.Face1) || this.attacking
            ) {
                this.attack()
                this.shoot(velocity, false)
            }

            // Normaliseer de snelheid zodat schuin bewegen dezelfde snelheid als normaal heeft.
            if (velocity.x !== 0 || velocity.y !== 0) {
                velocity = velocity.normalize().scale(new Vector(this.playerSpeed, this.playerSpeed));
            }

            this.vel = velocity;
        }
    }

    movementAnim(direction){
        if (this.attacking === false) {
            switch (direction) {
                case 'up':
                    this.graphics.use(this.animationUp);
                    this.shadow.rotation = Math.PI / 2;
                    this.shadow.pos.x = 0
                    this.shadow.pos.y = 0
                    break
                case 'down':
                    this.graphics.use(this.animationDown);
                    this.shadow.rotation = Math.PI / 2;
                    this.shadow.pos.x = 0
                    this.shadow.pos.y = -10
                    break
                case 'left':
                    this.graphics.use(this.animationLeft);
                    this.shadow.pos.x = 4
                    this.shadow.rotation = 0
                    this.shadow.pos.y = 5
                    break
                case 'right':
                    this.graphics.use(this.animationRight);
                    this.shadow.rotation = 0
                    this.shadow.pos.x = -2
                    this.shadow.pos.y = 5
                    break
                default:
                    this.graphics.use(this.animationLeft);
                    break
            }
        }
    }

    idleAnim(){
        if (this.attacking === false){
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
    }

    shoot(velocityVector, overRide){
        if (this.canShoot === true || overRide === true) {
            this.canShoot = false
            console.log('player vel' + velocityVector)
            if (velocityVector.x === 0 && velocityVector.y === 0) {
                switch (this.lastPressed) {
                    case 'up':
                        this.shoot(new Vector(0,-1 * this.projectileSpeed), true)
                        break;
                    case 'down':
                        this.shoot(new Vector(0, this.projectileSpeed), true)
                        break;
                    case 'left':
                        this.shoot(new Vector(-1 * this.projectileSpeed,0), true)
                        break;
                    case 'right':
                        this.shoot(new Vector(this.projectileSpeed,0), true)
                        break;
                }
            } else{
                const projectileVector = velocityVector.normalize().scale(new Vector(this.projectileSpeed * this.projectileSpeedModifier, this.projectileSpeed * this.projectileSpeedModifier))
                if (this.invertShootDirectionUpDown){
                    projectileVector.y = -1 * projectileVector.y
                    const projectile = new FireProjectile1(projectileVector);
                    this.addChild(projectile);
                    this.resetShootTimer(); // Call the method to reset the shoot timer
                } else if (this.invertShootDirectionLeftRight){
                    projectileVector.x = -1 * projectileVector.x
                    const projectile = new FireProjectile1(projectileVector);
                    this.addChild(projectile);
                    this.resetShootTimer(); // Call the method to reset the shoot timer
                } else{
                    const projectile = new FireProjectile1(projectileVector);
                    this.addChild(projectile);
                    this.resetShootTimer(); // Call the method to reset the shoot timer
                }
            }
        }
    }

    attack() {
        switch (this.lastPressed) {
            case 'up':
                this.attacking = true
                if (this.invertShootDirectionUpDown){
                    this.graphics.use(this.animationAtackDown);
                    this.animationAtackDown.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                } else{
                    this.graphics.use(this.animationAtackUp);
                    this.animationAtackUp.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                }
            case 'down':
                this.attacking = true
                if (this.invertShootDirectionUpDown){
                    this.graphics.use(this.animationAtackUp);
                    this.animationAtackUp.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                } else{
                    this.graphics.use(this.animationAtackDown);
                    this.animationAtackDown.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                }
            case 'left':
                this.attacking = true
                if (this.invertShootDirectionLeftRight){
                    this.graphics.use(this.animationAtackRight);
                    this.animationAtackRight.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                } else{
                    this.graphics.use(this.animationAtackLeft);
                    this.animationAtackLeft.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                }
            case 'right':
                this.attacking = true
                if (this.invertShootDirectionLeftRight){
                    this.graphics.use(this.animationAtackLeft);
                    this.animationAtackLeft.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                } else{
                    this.graphics.use(this.animationAtackRight);
                    this.animationAtackRight.events.on('loop', (a) => {
                        this.attacking = false;
                    })
                    break
                }
        }
    }

    resetShootTimer() {
        setTimeout(() => {
            this.canShoot = true; // Reset the flag after 500ms
        }, 500);
    }

    timerOverWorld(){
        setTimeout(() => {
            this.game.goToOverWorld();
        }, 1000)
    }
}