import { describe, expect, test, vi } from "vitest";
import { Tablero } from "../src/Tablero";

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

test("una pieza se fija completa en el tablero", () => {
    const tablero = new Tablero();
    const pieza = new PiezaCuadrado();

    tablero.añadirPieza(pieza);

    while (tablero.moverAbajo()) {
       
    }

    const bloques = tablero.cuadricula.filter(
        celda => celda === 1
    );

    expect(bloques.length).toBe(4);
});