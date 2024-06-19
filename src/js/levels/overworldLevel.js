import { BoundingBox, Scene, Vector, Random } from "excalibur"
import { Player } from "../player.js";
import { Resources } from "../resources.js";
import { EnterLevel } from "../enterlevel.js";
import { Flower } from "../flowers.js";
import { noFlower } from "../noflowers.js";
import { Chest } from "../chest.js";
import { Bush } from "../bush.js";
import { Man } from "../enemies/man.js";

export class OverworldLevel extends Scene {

    player
    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        Resources.MainScene.addToScene(this);


        this.enterlevel1 = new EnterLevel(2113.75, 450.16, this.game, 1);
        this.add(this.enterlevel1);

        this.enterlevel2 = new EnterLevel(1607, 2131.29, this.game, 2);
        this.add(this.enterlevel2);

        this.enterlevel3 = new EnterLevel(217, 1868, this.game, 3);
        this.add(this.enterlevel3);

        this.enterlevel4 = new EnterLevel(287.45, 694, this.game, 4);
        this.add(this.enterlevel4);

        for (let i = 0; i < 200; i++) {

            this.flower = new Flower(this.getRandomNumber(0, 2400), this.getRandomNumber(0, 2400), this.game)

            this.add(this.flower);
        }

        for (let i = 0; i < 100; i++) {

            this.bush = new Bush(this.getRandomNumber(0, 2400), this.getRandomNumber(0, 2400))

            this.add(this.bush);
        }

        this.noflower = new noFlower(240, 240, 287, 695)
        this.add(this.noflower)
        this.noflower1 = new noFlower(240, 240, 2112, 458)
        this.add(this.noflower1)
        this.noflower2 = new noFlower(240, 240, 1604, 2138)
        this.add(this.noflower2)
        this.noflower3 = new noFlower(240, 240, 217, 1871)
        this.add(this.noflower3)
        this.noflower4 = new noFlower(240, 195, 1329, 1207)
        this.add(this.noflower4)

        for (let i = 0; i < 50; i++) {

            this.chest = new Chest(this.getRandomNumber(0, 2400), this.getRandomNumber(0, 2400))

            this.add(this.chest);
        }

        for (let i = 0; i < 10; i++) {

            this.man = new Man(null, this.game)
            this.man.pos = new Vector(this.getRandomNumber(0, 2400), this.getRandomNumber(0, 2400))

            this.add(this.man);
        }
        this.player = new Player(this.game);
        this.player.pos = new Vector(200, 1500);
        this.add(this.player);


        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 2500, 3000)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;

    }

    onActivate(context) {

    }
    getRandomNumber(min, max) {
        // Controleer of de invoerwaarden geldig zijn
        if (min > max) {
            throw new Error("Minimale waarde moet kleiner zijn dan of gelijk zijn aan maximale waarde.");
        }
        // Genereer een willekeurig getal tussen min en max (inclusief)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }


}