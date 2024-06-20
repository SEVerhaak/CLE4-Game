import {
    Actor, Animation, AnimationStrategy, CollisionType, Engine, Input, Keys, Random, range, SpriteSheet, Vector
} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { Healthbar } from "./UI/healthBar.js";
import { Projectile } from "./projectiles/projectile.js";
import { Enemy } from "./enemies/enemy.js";
import { Inventory } from "./inventory.js";
import { Shadow } from "./shadow.js";
import { FireProjectile1 } from "./projectiles/fireProjectile1.js";
import { FireProjectile2 } from "./projectiles/fireProjectile2.js";
import { FireProjectile3 } from "./projectiles/fireProjectile3.js";
import { UI } from "./UI/uiComponent.js";
import { CurrentNectar } from "./UI/currentNectar.js";
import { CurrentSuperNectar } from "./UI/currentSuperNectar.js";
import { CurrentProjectile } from "./UI/currentProjectile.js";
import { Man } from "./enemies/man.js";
import { TopHat } from "./hats/tophat.js";
import { WizardHat } from "./hats/wizardhat.js";
import { SombreroHat } from "./hats/sombrerohat.js";
import { CurrentHat } from "./UI/currentHat.js";
import { Hat } from "./hats/hat.js";
import { Pickup } from "./pickups/pickup.js";

export class Player extends Actor {
    // keyPressArray up, down, left, right
    keyPressArray = [0, 0, 0, 0];
    // speler snelheid
    playerSpeed = 100;
    hats = [null];
    projectileSpeed = 200;
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

    uiComponent
    nectarUI
    nectarSuperUI
    currentProjectileUI
    hatUI
    


    constructor(game) {
        super({
            width: 16, height: 16, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(1.5, 1.5);
        this.game = game;
        this.inventory = game.inventory

    }

    onInitialize(engine) {
        super.onInitialize(engine);

        //this.inventory = new Inventory(engine,0,0)
        //this.addChild(this.inventory);
        this.uiComponent = new UI(this.game)
        this.uiComponent.pos = new Vector(-115, -80)
        this.uiComponent.scale = new Vector(0.05, 0.05)
        this.uiComponent.z = 99
        this.addChild(this.uiComponent)

        this.nectarUI = new CurrentNectar(this.game)
        this.nectarUI.pos = new Vector(-110, -65)
        this.nectarUI.scale = new Vector(0.1, 0.1)
        //this.nectarUI.scoreText.scale = new Vector(1,1)
        this.nectarUI.z = 99
        this.addChild(this.nectarUI)
        this.nectarUI.setScore();

        this.nectarSuperUI = new CurrentSuperNectar(this.game)
        this.nectarSuperUI.pos = new Vector(-95, -63)
        this.nectarSuperUI.scale = new Vector(0.1, 0.1)
        this.nectarSuperUI.z = 99
        this.addChild(this.nectarSuperUI)

        this.hatUI = new CurrentHat(this.game)
        this.hatUI.pos = new Vector(-80, -66)
        this.hatUI.scale = new Vector(0.15, 0.15)
        this.hatUI.z = 99
        this.addChild(this.hatUI)

        this.currentProjectileUI = new CurrentProjectile(this.game)
        this.currentProjectileUI.pos = new Vector(-67, -65)
        this.currentProjectileUI.scale = new Vector(0.7, 0.7)
        this.currentProjectileUI.z = 99

        if (this.inventory.getSelectedProjectileId() !== -1) {
            this.currentProjectileUI.setIcon(this.inventory.projectiles[this.inventory.currentSelectedItemIndex].projectileSprite, 3)
        }
        this.addChild(this.currentProjectileUI)


        this.healthBar = new Healthbar(this.game, false);
        this.healthBar.inventory = this.inventory
        this.addChild(this.healthBar);
        this.healthBar.healthTimer(this.inventory.health)
        this.healthBar.pos = new Vector(-8, -17);

        this.shadow = new Shadow()
        this.shadow.pos = new Vector(-2, 5);
        this.shadow.graphics.opacity = 0.5
        this.addChild(this.shadow);

        this.loadHats();


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

        this.health = this.inventory.health
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Enemy || evt.other instanceof Man) {
            this.inventory.health -= 0.005;
            this.healthBar.reduceHealth(0.005);
            if (this.health <= 0.01) {
                this.graphics.use(this.animationDeath);
                evt.other.killedOther = true;
                // this.healthBar.kill();
                this.body.collisionType = CollisionType.PreventCollision
                this.TimerGameover(evt.other)
                // this.kill();
            }
        } if (evt.other instanceof Pickup) {
            this.game.scenes['overworld'].doorLevelHandler();
        }
    }

    updateNectarScore() {
        this.nectarUI.setScore2(this.game)
        this.nectarSuperUI.setScore(this.game)
    }

    add(accumulator, a) {
        return accumulator + a;
    }

    onPreUpdate(engine, delta) {
        this.health = this.inventory.health
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


            if ((engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up) || yAxis < -0.5)) {
                velocity.y = -this.playerSpeed;
                this.movementAnim('up')
                this.keyPressArray[0] = 1;
                this.lastPressed = 'up'
            } else {
                this.keyPressArray[0] = 0;
            }

            if ((engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down) || yAxis > 0.5)) {
                velocity.y = this.playerSpeed;
                this.movementAnim('down')
                this.keyPressArray[1] = 1;
                this.lastPressed = 'down'
            } else {
                this.keyPressArray[1] = 0;
            }

            this.invertShootDirectionUpDown = (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down) || yAxis > 0.5) && (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up) || yAxis < -0.5);
            this.invertShootDirectionLeftRight = (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left) || xAxis < -0.5) && (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right) || xAxis > 0.5);

            if ((engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left) || xAxis < -0.5)) {
                velocity.x = -this.playerSpeed;
                this.movementAnim('left')
                this.keyPressArray[2] = 1;
                this.lastPressed = 'left'

            } else {
                this.keyPressArray[2] = 0;
            }

            if ((engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right) || xAxis > 0.5)) {
                velocity.x = this.playerSpeed;
                this.movementAnim('right')
                this.keyPressArray[3] = 1;
                this.lastPressed = 'right'
            } else {
                this.keyPressArray[3] = 0;
            }

            if ((engine.input.keyboard.wasPressed(Keys.Space) ||
                engine.input.gamepads.at(0).wasButtonPressed(Input.Buttons.Face1)) && this.canShoot
            ) {
                this.attacking = true
                this.attack(velocity)
            }
            if (engine.input.keyboard.wasPressed(Keys.ShiftLeft)) {
                this.inventory.setSelectedProjectileID()
                if (this.inventory.getSelectedProjectileId() !== -1) {
                    this.currentProjectileUI.setIcon(this.inventory.projectiles[this.inventory.currentSelectedItemIndex].projectileSprite, this.inventory.projectiles[this.inventory.currentSelectedItemIndex].endFrame)
                }
                //this.currentProjectileUI.setIcon(this.inventory.projectiles[this.inventory.getSelectedProjectileId()])
            }
            if (engine.input.keyboard.wasPressed(Keys.ShiftRight)) {

                //this.currentProjectileUI.setIcon(this.inventory.projectiles[this.inventory.getSelectedProjectileId()])
            }

            // Normaliseer de snelheid zodat schuin bewegen dezelfde snelheid als normaal heeft.
            if (velocity.x !== 0 || velocity.y !== 0) {
                velocity = velocity.normalize().scale(new Vector(this.playerSpeed, this.playerSpeed));
            }
            this.vel = velocity;
        }
    }

    movementAnim(direction) {
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

    idleAnim() {
        if (this.attacking === false) {
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

    shoot(velocityVector, overRide) {
        if (this.canShoot === true || overRide === true) {
            this.canShoot = false
            if (velocityVector.x === 0 && velocityVector.y === 0) {
                switch (this.lastPressed) {
                    case 'up':
                        this.shoot(new Vector(0, -1 * this.projectileSpeed), true)
                        break;
                    case 'down':
                        this.shoot(new Vector(0, this.projectileSpeed), true)
                        break;
                    case 'left':
                        this.shoot(new Vector(-1 * this.projectileSpeed, 0), true)
                        break;
                    case 'right':
                        this.shoot(new Vector(this.projectileSpeed, 0), true)
                        break;
                }
            } else {
                const projectileVector = velocityVector.normalize().scale(new Vector(this.projectileSpeed * this.projectileSpeedModifier, this.projectileSpeed * this.projectileSpeedModifier))

                if (this.invertShootDirectionUpDown) {
                    projectileVector.y = -1 * projectileVector.y
                }
                if (this.invertShootDirectionLeftRight) {
                    projectileVector.x = -1 * projectileVector.x
                }

                const projectileArray = [
                    new FireProjectile1(projectileVector, this.pos),
                    new FireProjectile2(projectileVector, this.pos),
                    new FireProjectile3(projectileVector, this.pos)
                ]

                //const projectile = new FireProjectile2(projectileVector);
                if (this.inventory.getSelectedProjectileId() !== -1) {
                    const projectile = projectileArray[this.inventory.getSelectedProjectileId()];
                    this.game.currentScene.add(projectile)
                    this.resetShootTimer(); // Call the method to reset the shoot timer
                } else {
                    this.resetShootTimer(); // Call the method to reset the shoot timer
                    console.log('no items in inventory')
                }
            }
        }
    }

    attack(velocity) {
        switch (this.lastPressed) {
            case 'up':
                this.graphics.use(this.animationAtackUp);
                this.shoot(velocity, false)
                break
            case 'down':
                this.graphics.use(this.animationAtackDown);
                this.shoot(velocity, false)
                break
            case 'left':
                this.graphics.use(this.animationAtackLeft);
                this.shoot(velocity, false)
                break
            case 'right':
                this.graphics.use(this.animationAtackRight);
                this.shoot(velocity, false)
                break
        }
    }

    resetShootTimer() {
        setTimeout(() => {
            this.canShoot = true; // Reset the flag after 500ms
            this.attacking = false;
        }, 500);
    }

    TimerGameover(enemy) {
        console.log('timer')
        setTimeout(() => {
            enemy.killedOther = false;
            this.inventory.health = 1;
            this.inventory.nectarAmount = 0
            if (this.lastHat) {
                this.removeChild(this.lastHat)
            }

            this.healthBar.setHealth(1)
            this.body.collisionType = CollisionType.Active
            this.game.scenes['GameOver'].GameOverImageHandler(enemy);
            this.game.goToScene('GameOver')
        }, 1000)
    }

    hatHandler(hat) {
        let hatFound = false

        for (let i = 0; i < this.hats.length; i++) {
            if (i !== 0) {
                if (this.hats[i].name === hat.name) {
                    hatFound = true;
                }
            }
        }

        if (hatFound) {
            hat.pos = new Vector(-0.5, -12)
            this.lastHat.kill()
            this.lastHat = hat
            this.inventory.hatIndex++
        } else {
            if (this.lastHat) {
                this.lastHat.kill()
            }
            hat.pos = new Vector(-0.5, -12)
            this.lastHat = hat
            this.inventory.addItem(hat, false, null, null, null, true)
            this.hats.push(hat)
            this.inventory.hatIndex++
        }
        console.log(this.inventory.hatIndex)
        this.hatUI.setIcon(this.lastHat);
        //this.hatChanger();
        this.addChild(this.lastHat)

    }


    loadHats() {
        this.lastHat = this.game.inventory.lastHat
        if (this.lastHat instanceof Hat) {
            this.hatHandler(this.lastHat)
            this.hatUI.setIcon(this.lastHat);
        }
    }

    hatChanger() {
    }
}