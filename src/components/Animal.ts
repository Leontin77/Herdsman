import { Container, AnimatedSprite, Texture, DisplayObject, } from "pixi.js";

export class Animal {
    private _view: Container;
    private _animal: AnimatedSprite;
    private _counted: boolean;

    constructor() {
        this._view = new Container();
        this._counted = false;

        const textures: Texture[] = [
            Texture.from('animal'),
            Texture.from('animal1'),
            Texture.from('animal2'),
            Texture.from('animal2'),
            Texture.from('animal2'),
            Texture.from('animal2'),
            Texture.from('animal1'),
            Texture.from('animal')
        ];

        this._animal = new AnimatedSprite(textures);
        this._animal.animationSpeed = 0.1;
        this._animal.anchor.set(0.5); // центруємо спрайт
        this._animal.play();

        this._view.addChild(this._animal as DisplayObject);
    }
    get view(): Container {
        return this._view;
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

    get counted(): boolean {
        return this._counted;
    }

    set counted(value: boolean) {
        this._counted = value;
    }

    // moveAnimal(): void {
    //     // const texture = Texture.from('animal3');
    //     // this._animal.textures = texture as any
    //     console.log('1');
    // }
}
