import { describe, expect, test } from "vitest";
import { Tablero } from "../src/Tablero";
import { PiezaT } from '../src/PiezaT';
import { PiezaCuadrado } from '../src/PiezaCuadrado';
import { PiezaPalo } from '../src/PiezaPalo';

// ===========================================================================
// Requisito 3: Test del tablero (Board)
// a. Que tenga el formato (10 columnas x 20 filas)
// b. Que se pueda agregar pieza (completa)
// c. Que la pieza que se agrega no se pueda sobrepasar los límites del tablero
// ===========================================================================
describe("3. Test del tablero (Board)", () => {
  test("a. tiene el formato adecuado (10 columnas x 20 filas = 200 celdas)", () => {
    const tablero = new Tablero();
    expect(tablero.ancho).toBe(10);
    expect(tablero.alto).toBe(20);
    expect(tablero.cuadricula.length).toBe(200);
    expect(tablero.cuadricula.every(celda => celda === 0)).toBe(true);
  });

  test("b. se puede agregar una pieza completa en el tablero", () => {
    const tablero = new Tablero();
    const pieza = new PiezaCuadrado();
    const resultado = tablero.añadirPiezaEn(pieza, 4, 0);

    expect(resultado).toBe(true);

    const grilla = tablero.cuadriculaConPiezaActiva;
    expect(grilla[0 * 10 + 4]).toBe(1);
    expect(grilla[0 * 10 + 5]).toBe(1);
    expect(grilla[1 * 10 + 4]).toBe(1);
    expect(grilla[1 * 10 + 5]).toBe(1);
  });

  test("c. la pieza que se agrega no puede sobrepasar el limite derecho", () => {
    const tablero = new Tablero();
    const palo = new PiezaPalo();
    const resultado = tablero.añadirPiezaEn(palo, 7, 0);
    expect(resultado).toBe(false);
  });

  test("c. la pieza que se agrega no puede colocarse en posiciones fuera del limite izquierdo (x < 0)", () => {
    const tablero = new Tablero();
    const pieza = new PiezaT();
    const resultado = tablero.añadirPiezaEn(pieza, -1, 0);
    expect(resultado).toBe(false);
  });

  test("añadir una pieza aleatoriamente al tablero", () => {
    const tablero = new Tablero();
    const pieza = new PiezaCuadrado();
    const resultado = tablero.añadirPieza(pieza);
    expect(resultado).toBe(true);
  });

  test("se agrega una pieza después de una rotación previa", () => {
    const tablero = new Tablero();
    const pieza = new PiezaT();
    pieza.rotarDerecha();
    const resultado = tablero.añadirPieza(pieza);
    expect(resultado).toBe(true);
  });
});

// ===========================================================================
// Requisito 6: En cada movimiento la pieza baja 1 fila (si puede)
// ===========================================================================
describe("6. Movimiento descendente del tablero", () => {
  test("moverAbajo() baja la pieza una fila y retorna true si puede", () => {
    const tablero = new Tablero();
    tablero.añadirPiezaEn(new PiezaCuadrado(), 4, 0);

    const puedeBajar = tablero.moverAbajo();
    expect(puedeBajar).toBe(true);

    const grilla = tablero.cuadriculaConPiezaActiva;
    // la pieza debe estar ahora en fila 1, no en fila 0
    expect(grilla[1 * 10 + 4]).toBe(1);
    expect(grilla[0 * 10 + 4]).toBe(0);
  });
});

// ===========================================================================
// Requisito 7: Limpieza de líneas completas
// ===========================================================================
describe("7. LimpiarLinea", () => {
  test("si se completan líneas, se suman y se eliminan", () => {
    const tablero = new Tablero();

    for (let i = 0; i < 20; i++) {
      tablero.cuadricula[i] = 1;
    }

    const lineasEliminadas = tablero.limpiarLinea();
    expect(lineasEliminadas).toBe(2);
  });
});
