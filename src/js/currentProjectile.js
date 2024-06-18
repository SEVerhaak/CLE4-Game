import {Actor, Animation, Color, Font, FontUnit, Label, range, ScreenElement, SpriteSheet, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {FireProjectile1} from "./projectiles/fireProjectile1.js";

export class CurrentProjectile extends ScreenElement {

    game
    score
    scoreText
    scoreTextBG
    item = false;

    constructor(game) {
        super();
        this.game = game
        this.z = 99
    }

    onInitialize(engine) {
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }

    setIcon(projectileSprite, endFrame){
        let bugfixHack = 1;
        let bugfixHack2 = 0
        if (projectileSprite.height > 16){
            bugfixHack = 2;
            bugfixHack2 = -1
        }
        console.log(endFrame)

        const spriteAnimationSheet = SpriteSheet.fromImageSource({
            image: projectileSprite,
            grid: {
                columns: 4 + bugfixHack2,
                rows: bugfixHack,
                spriteWidth: 16,
                spriteHeight: projectileSprite.height / bugfixHack
            },
        });
        this.animation = Animation.fromSpriteSheet(spriteAnimationSheet, range(0, endFrame), 250);
        this.graphics.use(this.animation)
    }

    setScore(value){
        this.scoreText.text = value
        this.scoreTextBG.text = value
    }
}
