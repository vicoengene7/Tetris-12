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

describe("LimpiarLinea", () => {

  test("si se colocan varias piezas y completan una línea, se suma y se elimina", () => {
    const tablero = new Tablero();
    const columnas = [0, 2, 4, 6, 8];
    const colMax = 10 - 2; 

    columnas.forEach((columna) => {
      
      vi.spyOn(Math, "random").mockReturnValue((columna + 0.5) / (colMax + 1));

      const pieza = new PiezaCuadrado();
      tablero.añadirPieza(pieza);

      for (let i = 0; i < 19; i++) {
        tablero.moverAbajo();
      }
    });

    vi.restoreAllMocks();

    const lineasEliminadas = tablero.limpiarLinea();

    expect(lineasEliminadas).toBe(2);
  });

});