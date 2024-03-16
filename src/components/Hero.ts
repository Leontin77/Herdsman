import { Container, AnimatedSprite, Texture, DisplayObject,  } from "pixi.js";

export class Hero {
    private _view: Container;
    private _speed: { x: number; y: number };
    private _mainHero: AnimatedSprite;

    constructor() {
        this._view = new Container();
        this._speed = { x: 0, y: 0 };

        const textures: Texture[] = [
            Texture.from('mainHero'),
            Texture.from('mainHero1'),
            Texture.from('mainHero2')
        ];

        this._mainHero = new AnimatedSprite(textures);
        this._mainHero.animationSpeed = 0.25;
        this._mainHero.anchor.set(0.5); // центруємо спрайт
        this._mainHero.play();

        this._view.addChild(this._mainHero as DisplayObject);
    }
    get view(): Container { 
        return this._view; 
    }

    get speed(): { x: number; y: number } {
        return this._speed;
    }
    set speed(value: { x: number; y: number }) {
        this._speed = value;
    }

    get x(): number {
        return this._view.position.x;
    }
    set x(value: number) {
        this._view.position.x = value;
    }

    get y(): number {
        return this._view.position.y;
    }
    set y(value: number) {
        this._view.position.y = value;
    }

    moveHero(): void {
        this._mainHero.play();
    }

    stopHero(): void {
        this._mainHero.stop();
    }
}
