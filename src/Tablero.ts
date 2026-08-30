import { Pieza } from './Pieza';

export class Tablero {
  private _cuadricula: number[];
  private _ancho: number = 10;
  private _alto: number = 20;
  private _piezaActiva: Pieza | null = null;
  private _piezasX: number = 0;
  private _piezasY: number = 0;

  constructor() {
    this._cuadricula = new Array(this._ancho * this._alto).fill(0);
  }

  private indice(fila: number, columna: number): number {
    return fila * this._ancho + columna;
  }

  private dentroDeLimites(fila: number, columna: number): boolean {
    return columna >= 0 && columna < this._ancho && fila >= 0 && fila < this._alto;
  }

  private celdaLibre(fila: number, columna: number): boolean {
    return this._cuadricula[this.indice(fila, columna)] === 0;
  }

  private puedeColocar(pieza: Pieza, x: number, y: number): boolean {
    return pieza.forma.every((filaArr, f) =>
      filaArr.every((celda, c) => {
        const filaTablero = y + f;
        const colTablero = x + c;
        return celda === 0 ||
          (this.dentroDeLimites(filaTablero, colTablero) && this.celdaLibre(filaTablero, colTablero));
      })
    );
  }

  private fijarPieza(): void {
    this._piezaActiva?.forma.forEach((filaArr, f) =>
      filaArr.forEach((celda, c) => {
        (celda === 1) && (this._cuadricula[this.indice(this._piezasY + f, this._piezasX + c)] = 1);
      })
    );
    this._piezaActiva = null;
  }

  private activarPieza(pieza: Pieza, x: number, y: number): void {
    this._piezaActiva = pieza;
    this._piezasX = x;
    this._piezasY = y;
  }

  public añadirPieza(pieza: Pieza): boolean {
    const anchoPieza = pieza.forma[0]!.length; // ancho real del estado actual de la pieza
    const colMax = this._ancho - anchoPieza;
    const x = Math.floor(Math.random() * (colMax + 1));
    const y = 0;
    const puedeAgregar = this._piezaActiva === null && this.puedeColocar(pieza, x, y);

    puedeAgregar && this.activarPieza(pieza, x, y);
    return puedeAgregar;
  }

  public moverAbajo(): boolean {
    const puedeBajar = this._piezaActiva !== null &&
      this.puedeColocar(this._piezaActiva, this._piezasX, this._piezasY + 1);

    puedeBajar && this._piezasY++;
    (!puedeBajar && this._piezaActiva !== null) && this.fijarPieza();
    return puedeBajar;
  }

  private rotar(aplicar: () => void, revertir: () => void): boolean {
    const tienePieza = this._piezaActiva !== null;
    tienePieza && aplicar();
    const entra = tienePieza && this.puedeColocar(this._piezaActiva!, this._piezasX, this._piezasY);
    (tienePieza && !entra) && revertir();
    return Boolean(entra);
  }

  public rotarIzquierda(): boolean {
    return this.rotar(
      () => { this._piezaActiva?.rotarIzquierda(); },
      () => { this._piezaActiva?.rotarDerecha(); }
    );
  }

  public rotarDerecha(): boolean {
    return this.rotar(
      () => { this._piezaActiva?.rotarDerecha(); },
      () => { this._piezaActiva?.rotarIzquierda(); }
    );
  }

  public limpiarLinea(): number {
    const filas = Array.from({ length: this._alto }, (_, f) =>
      this._cuadricula.slice(this.indice(f, 0), this.indice(f, 0) + this._ancho)
    );
    const filasIncompletas = filas.filter((fila) => !fila.every((celda) => celda !== 0));
    const lineasLimpiadas = this._alto - filasIncompletas.length;
    const filasVacias = Array.from({ length: lineasLimpiadas }, () => new Array(this._ancho).fill(0));

    this._cuadricula = [...filasVacias, ...filasIncompletas].flat();
    return lineasLimpiadas;
  }

  public espacioParaNuevaPieza(): boolean {
    return Array.from({ length: this._ancho }, (_, col) => this._cuadricula[this.indice(0, col)])
      .some((celda) => celda === 0);
  }

  get cuadricula(): number[] {
    return this._cuadricula;
  }
}