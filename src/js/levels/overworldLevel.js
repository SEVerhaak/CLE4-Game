import { BoundingBox, Scene, Vector, Random } from "excalibur"
import { Player } from "../player.js";
import { Resources } from "../resources.js";
import { EnterLevel } from "../enterlevel.js";
import { Flower } from "../flowers.js";
import { noFlower } from "../noflowers.js";
import { Chest } from "../chest.js";
import { Bush } from "../bush.js";
import { Man } from "../enemies/man.js";
import { Finalboss } from "../enemies/finalboss.js";
import {SuperNectarPickup} from "../pickups/supernectarpickup.js";

export class OverworldLevel extends Scene {

    player
    game
    engine
    enterlevel1bool
    enterlevel2bool
    enterlevel3bool
    enterlevel4bool



    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.FillOverWorld(engine)
        this.engine = engine;

        Resources.Worldmusic.play()

    }
    RestartOverWorld() {
        this.clear()
        this.FillOverWorld(this.engine)
    }
    FillOverWorld(engine) {
        Resources.MainScene.addToScene(this);

        // this.finalboss = new Finalboss(null, this.game);
        // this.finalboss.pos = new Vector(1300, 1300)
        // this.add(this.finalboss);
        // Resources.Worldmusic.stop()
        // Resources.Finalbossmusic.play()

        for (let i = 0; i < 300; i++) {
            this.flower = new Flower(this.getRandomNumber(50, 2350), this.getRandomNumber(50, 2350))
            this.add(this.flower);
        }

        for (let i = 0; i < 100; i++) {
            this.bush = new Bush(this.getRandomNumber(50, 2350), this.getRandomNumber(50, 2350))
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

            this.chest = new Chest(this.getRandomNumber(50, 2350), this.getRandomNumber(50, 2350))

            this.add(this.chest);
        }

        for (let i = 0; i < 10; i++) {

            this.man = new Man(null, this.game)
            this.man.pos = new Vector(this.getRandomNumber(50, 2350), this.getRandomNumber(50, 2350))

            this.add(this.man);
        }

    }
    onDeactivate(context) {
        super.onDeactivate(context)
        console.log('deactivate')
        this.player.kill()
    }
    onActivate(context) {
        super.onActivate(context)
        console.log('activate')
        this.cameraDelay(this.engine)
        this.player = new Player(this.game)
        this.player.pos = new Vector(1300, 1200)
        this.add(this.player)

        const superNectar = new SuperNectarPickup(1250,1200)
        this.add(superNectar)
    }
    cameraDelay(engine) {
        setTimeout(() => {
            engine.currentScene.camera.strategy.lockToActor(this.player);
            engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(-600, -600, 3000, 3000)); // Set the game bounds
            engine.currentScene.camera.zoom = 4;
        }, 10);
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
    doorLevelHandler(nectar) {
        let allEnterLevels = this.actors.filter(actor => actor instanceof EnterLevel)
        for (let i = 0; i < allEnterLevels.length; i++) {
            if (allEnterLevels[i].name === 'enterlevel1') {
                this.enterlevel1bool = true;
            }
            if (allEnterLevels[i].name === 'enterlevel2') {
                this.enterlevel2bool = true;
            }
            if (allEnterLevels[i].name === 'enterlevel3') {
                this.enterlevel3bool = true;
                console.log(this.enterlevel3bool)
            }
            if (allEnterLevels[i].name === 'enterlevel4') {
                this.enterlevel4bool = true;
            }
        }
        if (this.game.inventory.nectarAmount >= 10 && !this.enterlevel1bool) {

            this.enterlevel1 = new EnterLevel(2113.75, 450.16, this.game, 1, 'enterlevel1');
            this.add(this.enterlevel1);
        }
        if (nectar >= 20 && !this.enterlevel2bool) {

            this.enterlevel2 = new EnterLevel(1607, 2131.29, this.game, 2, 'enterlevel2');
            this.add(this.enterlevel2);
        }
        if (nectar >= 30 && !this.enterlevel3bool) {

            this.enterlevel3 = new EnterLevel(217, 1868, this.game, 3, 'enterlevel3');
            this.add(this.enterlevel3);
        }
        if (nectar >= 40 && !this.enterlevel4bool) {

            this.enterlevel4 = new EnterLevel(287.45, 694, this.game, 4, 'enterlevel4');
            this.add(this.enterlevel4);
        }
    }


}