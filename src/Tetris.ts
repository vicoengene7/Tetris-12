import { Tablero } from './Tablero';
import { Reloj } from './Reloj';
import { Pieza } from './Pieza';
import { PiezaT } from './PiezaT';
import { PiezaCuadrado } from './PiezaCuadrado';
import { PiezaPalo } from './PiezaPalo';
import { PiezaL } from './PiezaL';
import { PiezaPerro } from './PiezaPerro';

export class Tetris {

  private _tablero: Tablero;
  private _reloj: Reloj;

  constructor() {
    this._tablero = new Tablero();
    this._reloj = new Reloj();
  }

  private crearPiezaAleatoria(): Pieza {
    const tipos = [PiezaT, PiezaCuadrado, PiezaPalo, PiezaL, PiezaPerro];
    const indice = Math.floor(Math.random() * tipos.length);
    const TipoPieza = tipos[indice]!;
    return new TipoPieza();
  }

  public empezar(): boolean {
    return this._tablero.añadirPieza(this.crearPiezaAleatoria());
  }

  public tick(): number {
    this._reloj.tick();
    const sigueBajando = this._tablero.moverAbajo();
    this._tablero.limpiarLinea();

    const debeAgregarPieza = !sigueBajando && this._tablero.espacioParaNuevaPieza();
    debeAgregarPieza && this._tablero.añadirPieza(this.crearPiezaAleatoria());

    return this._reloj.tomarTicks;
  }

  public tomarTablero(): Tablero {
    return this._tablero;
  }
}