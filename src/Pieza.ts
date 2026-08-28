export abstract class Pieza {

    protected posiciones: number[][][];
    protected posicionActual: number;

    constructor(posiciones: number[][][]) {
        this.posiciones = posiciones;
        this.posicionActual = 0;
    }
}