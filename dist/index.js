"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var gsap_1 = require("gsap");
var pixi_js_1 = require("pixi.js");
var Hero_1 = require("./components/Hero");
var Animal_1 = require("./components/Animal");
var Scoreboard_1 = require("./components/Scoreboard");
var assetsMap_1 = require("./helpers/assetsMap");
var canvasElement = document.getElementById("canvas");
var app = new pixi_js_1.Application({
    view: canvasElement !== null && canvasElement !== void 0 ? canvasElement : undefined,
    backgroundColor: 0x00cc00,
    width: 820,
    height: 820,
});
function createAnimal() {
    var animal = new Animal_1.Animal();
    var animalPosition = {
        x: Math.random() * app.screen.width,
        y: Math.random() * app.screen.height - 220,
    };
    animal.x = animalPosition.x;
    animal.y = animalPosition.y;
    app.stage.addChild(animal.view);
    return animal;
}
function createAnimals() {
    var number = 5 + Math.floor(Math.random() * 10);
    var animals = [];
    for (var i = 0; i < number; i++) {
        animals.push(createAnimal());
    }
    return animals;
}
function createYard() {
    var yard = new pixi_js_1.Graphics();
    yard.beginFill(0xffff00);
    yard.drawRect(0, 0, app.screen.width, 200);
    yard.position.set(0, app.screen.height - 200);
    yard.endFill();
    app.stage.addChild(yard);
    return yard;
}
var runGame = function () {
    var stageContainer = new PIXI.Container();
    app.stage.addChild(stageContainer);
    var yard;
    var yardBounds;
    var animals;
    var hero;
    var scoreDisplay;
    var scoreboard;
    yard = createYard();
    yardBounds = yard.getBounds();
    animals = [];
    hero = new Hero_1.Hero();
    scoreDisplay = new Scoreboard_1.Scoreboard();
    scoreboard = new Scoreboard_1.Scoreboard();
    scoreboard.setPosition(20, 20);
    app.stage.addChild(scoreboard.view);
    app.stage.addChild(hero.view);
    var moveHero = function (event) {
        var distanceToCenter = event.data.getLocalPosition(app.stage);
        gsap_1.default.to(hero.view, {
            x: distanceToCenter.x,
            y: distanceToCenter.y,
            duration: 3,
            onStart: function () { return hero.moveHero(); },
            onComplete: function () { return hero.stopHero(); },
        });
    };
    function spawnAnimal() {
        var nextSpawnTime = 1000 + Math.random() * 4000;
        setTimeout(function () {
            animals.push(createAnimal());
            spawnAnimal();
        }, nextSpawnTime);
    }
    spawnAnimal();
    var checkAnimalProximity = function () {
        var heroPosition = hero.view.position;
        var animalsInsideYard = 0;
        var animalGroup = [];
        animals.map(function (animal) {
            var animalPosition = animal.view.position;
            var distance = Math.sqrt(Math.pow(animalPosition.x - heroPosition.x, 2) +
                Math.pow(animalPosition.y - heroPosition.y, 2));
            var isInYard = animalPosition.x >= yardBounds.x &&
                animalPosition.x <= yardBounds.x + yardBounds.width &&
                animalPosition.y >= yardBounds.y &&
                animalPosition.y <= yardBounds.y + yardBounds.height;
            if (animal.counted) {
                animalsInsideYard++;
            }
            var heroInYard = heroPosition.x >= yardBounds.x &&
                heroPosition.x <= yardBounds.x + yardBounds.width &&
                heroPosition.y >= yardBounds.y &&
                heroPosition.y <= yardBounds.y + yardBounds.height;
            if (distance < 100 && !isInYard && animalGroup.length <= 4) {
                console.log("animalGroup", animalGroup.length);
                animalGroup.push(animal);
                animal.counted = true;
                var angle = Math.atan2(heroPosition.y - animalPosition.y, heroPosition.x - animalPosition.x);
                var speed = 150;
                var dx = Math.cos(angle) * speed;
                var dy = Math.sin(angle) * speed;
                var finalX = animalPosition.x + dx;
                var finalY = animalPosition.y + dy;
                gsap_1.default.to(animal.view, { x: finalX, y: finalY, duration: 3 });
            }
            console.log("animalsInsideYard", animalsInsideYard);
            if (heroInYard && isInYard) {
                scoreboard.updateScore(animalsInsideYard);
            }
        });
    };
    app.ticker.add(checkAnimalProximity);
    app.renderer.plugins.interaction.interactive = true;
    app.renderer.plugins.interaction.on("pointerdown", moveHero);
    app.renderer.plugins.interaction.hitArea = new PIXI.Rectangle(0, 0, 800, 800);
    setTimeout(function () {
        animals = createAnimals();
    }, 1000);
};
assetsMap_1.assetsMap.sprites.forEach(function (value) { return app.loader.add(value.name, value.url); });
app.loader.load(runGame);
