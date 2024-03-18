import * as PIXI from "pixi.js";
import gsap from "gsap";
import { Application, Graphics, Rectangle, Container } from "pixi.js";
import { Hero } from "./components/Hero";
import { Animal } from "./components/Animal";
import { Scoreboard } from "./components/Scoreboard";
import { assetsMap } from "./helpers/assetsMap";

const canvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement | null;
const app = new Application({
  view: canvasElement ?? undefined,
  backgroundColor: 0x00cc00,
  width: 820,
  height: 820,
});

function createAnimal(): Animal {
  const animal = new Animal();
  const animalPosition = {
    x: Math.random() * app.screen.width,
    y: Math.random() * app.screen.height - 220,
  };
  animal.x = animalPosition.x;
  animal.y = animalPosition.y;
  app.stage.addChild(animal.view);
  return animal;
}

function createAnimals(): Animal[] {
  const number = 5 + Math.floor(Math.random() * 10);
  const animals: Animal[] = [];
  for (let i = 0; i < number; i++) {
    animals.push(createAnimal());
  }
  return animals;
}

function createYard(): Graphics {
  const yard = new Graphics();
  yard.beginFill(0xffff00);
  yard.drawRect(0, 0, app.screen.width, 200);
  yard.position.set(0, app.screen.height - 200);
  yard.endFill();
  app.stage.addChild(yard);
  return yard;
}

const runGame = () => {
  const stageContainer = new PIXI.Container();
  app.stage.addChild(stageContainer);

  let yard: Graphics;
  let yardBounds: Rectangle;
  let animals: Animal[];
  let hero: Hero;
  let scoreDisplay: Scoreboard;
  let scoreboard: Scoreboard;

  yard = createYard();
  yardBounds = yard.getBounds();
  animals = [];
  hero = new Hero();
  scoreDisplay = new Scoreboard();
  scoreboard = new Scoreboard();
  scoreboard.setPosition(20, 20);
  app.stage.addChild(scoreboard.view);
  app.stage.addChild(hero.view);

  const moveHero = (event: PIXI.InteractionEvent) => {
    const distanceToCenter = event.data.getLocalPosition(app.stage);
    gsap.to(hero.view, {
      x: distanceToCenter.x,
      y: distanceToCenter.y,
      duration: 3,
      onStart: () => hero.moveHero(),
      onComplete: () => hero.stopHero(),
    });
  };

  function spawnAnimal() {
    const nextSpawnTime = 1000 + Math.random() * 4000;
    setTimeout(() => {
      animals.push(createAnimal());
      spawnAnimal();
    }, nextSpawnTime);
  }
  spawnAnimal();

  const checkAnimalProximity = () => {
    const heroPosition = hero.view.position;
    let animalsInsideYard = 0;
    const animalGroup: any[] = [];
    animals.map((animal) => {
      const animalPosition = animal.view.position;
      const distance = Math.sqrt(
        Math.pow(animalPosition.x - heroPosition.x, 2) +
          Math.pow(animalPosition.y - heroPosition.y, 2)
      );
      const isInYard =
        animalPosition.x >= yardBounds.x &&
        animalPosition.x <= yardBounds.x + yardBounds.width &&
        animalPosition.y >= yardBounds.y &&
        animalPosition.y <= yardBounds.y + yardBounds.height;
      if (animal.counted) {
        animalsInsideYard++;
      }
      const heroInYard =
        heroPosition.x >= yardBounds.x &&
        heroPosition.x <= yardBounds.x + yardBounds.width &&
        heroPosition.y >= yardBounds.y &&
        heroPosition.y <= yardBounds.y + yardBounds.height;
      if (distance < 100 && !isInYard && animalGroup.length <= 4) {
        console.log("animalGroup", animalGroup.length);
        animalGroup.push(animal);
        animal.counted = true;
        const angle = Math.atan2(
          heroPosition.y - animalPosition.y,
          heroPosition.x - animalPosition.x
        );
        const speed = 150;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const finalX = animalPosition.x + dx;
        const finalY = animalPosition.y + dy;

        gsap.to(animal.view, { x: finalX, y: finalY, duration: 3 });
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

  setTimeout(() => {
    animals = createAnimals();
  }, 1000);
};

assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
app.loader.load(runGame);
