import {Actor, Animation, Color, Font, FontUnit, Label, range, ScreenElement, SpriteSheet, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {FireProjectile1} from "./fireProjectile1.js";

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
        console.log(endFrame)
        console.log(projectileSprite)
        const spriteAnimationSheet = SpriteSheet.fromImageSource({
            image: projectileSprite,
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 16,
                spriteHeight: 16
            },
        });
        this.animation = Animation.fromSpriteSheet(spriteAnimationSheet, range(0, 3), 250);
        this.graphics.use(this.animation)
    }

    setScore(value){
        this.scoreText.text = value
        this.scoreTextBG.text = value
    }
}
