export abstract class Pieza {


protected posiciones: number[][][];
protected posicionActual: number;

constructor(posiciones: number[][][]) {
    this.posiciones = posiciones;
    this.posicionActual = 0;
}

get forma(): number[][] {
    return this.posiciones[this.posicionActual]!;
}

rotarDerecha(): void {
    this.posicionActual =
        (this.posicionActual + 1) % this.posiciones.length;
}

rotarIzquierda(): void {
    this.posicionActual =
        (this.posicionActual - 1 + this.posiciones.length)
        % this.posiciones.length;
}

}
