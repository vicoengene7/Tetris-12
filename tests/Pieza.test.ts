import { describe, expect, test } from 'vitest';
import { PiezaT } from '../src/PiezaT';
import { PiezaCuadrado } from '../src/PiezaCuadrado';
import { PiezaPalo } from '../src/PiezaPalo';
import { PiezaL } from '../src/PiezaL';
import { PiezaPerro } from '../src/PiezaPerro';

// ===========================================================================
// test de creacion y verificacion de la forma inicial
// ===========================================================================
describe('1. Test de creación de piezas (forma inicial)', () => {
  test('PiezaT se crea con su forma inicial', () => {
    const pieza = new PiezaT();
    expect(pieza.forma).toEqual([
      [0, 1, 0],
      [1, 1, 1],
    ]);
  });

  test('PiezaCuadrado se crea con su forma inicial', () => {
    const pieza = new PiezaCuadrado();
    expect(pieza.forma).toEqual([
      [1, 1],
      [1, 1],
    ]);
  });

  test('PiezaPalo se crea con su forma inicial (horizontal)', () => {
    const pieza = new PiezaPalo();
    expect(pieza.forma).toEqual([
      [1, 1, 1, 1],
    ]);
  });

  test('PiezaL se crea con su forma inicial', () => {
    const pieza = new PiezaL();
    expect(pieza.forma).toEqual([
      [1, 0, 0],
      [1, 1, 1],
    ]);
  });

  test('PiezaPerro se crea con su forma inicial', () => {
    const pieza = new PiezaPerro();
    expect(pieza.forma).toEqual([
      [0, 1, 1],
      [1, 1, 0],
    ]);
  });
})