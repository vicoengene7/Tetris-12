import { describe, expect, test } from "vitest";
import { Tablero } from "../src/Tablero";
import { PiezaT } from '../src/PiezaT';

describe("Tablero", () => {

    test("tiene 200 celdas", () => {
        const tablero = new Tablero();

        expect(tablero.cuadricula.length).toBe(200);
    });

});

import { PiezaCuadrado } from '../src/PiezaCuadrado';
test ("añadir una pieza al tablero", () => {
    const tablero = new Tablero();
    const pieza = new PiezaCuadrado();
    const resultado = tablero.añadirPieza(pieza);
    expect(resultado).toBe(true);
});

describe("LimpiarLinea", () => {

  test("si se completan líneas, se suman y se eliminan", () => {
    const tablero = new Tablero();

    for (let i = 0; i < 20; i++) {
      tablero.cuadricula[i] = 1;
    }

    const lineasEliminadas = tablero.limpiarLinea();

    expect(lineasEliminadas).toBe(2);
});
  });

test("se agrega una pieza después de una rotación", () => {
    const tablero = new Tablero();
    const pieza = new PiezaT();

    pieza.rotarDerecha();

    const resultado = tablero.añadirPieza(pieza);

    expect(resultado).toBe(true);
    
});