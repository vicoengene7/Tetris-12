export abstract class Pieza {

    posiciones: number[][][];
    posicionActual: number;

    constructor(posiciones: number[][][]) {
        this.posiciones = posiciones;
        this.posicionActual = 0;
    }
}