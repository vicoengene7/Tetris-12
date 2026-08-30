export abstract class Pieza {


protected _posiciones: number[][][];
protected _posicionActual: number;

constructor(posiciones: number[][][]) {
    this._posiciones = posiciones;
    this._posicionActual = 0;
}

get forma(): number[][] {
    return this._posiciones[this._posicionActual]!;
}

rotarDerecha(): void {
    this._posicionActual =
        (this._posicionActual + 1) % this._posiciones.length;
}

rotarIzquierda(): void {
    this._posicionActual =
        (this._posicionActual - 1 + this._posiciones.length)
        % this._posiciones.length;
}

rotarA(indice: number): void {
    this._posicionActual = indice % this._posiciones.length;
}

get totalRotaciones(): number {
    return this._posiciones.length;
}

}
