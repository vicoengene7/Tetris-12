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
});
// ===========================================================================
// test de rotacion (a derecha e izquierda)
// ===========================================================================
describe('2. Test de rotación de piezas (derecha e izquierda)', () => {
  test('PiezaT rota a derecha e izquierda recorriendo sus estados', () => {
    const pieza = new PiezaT();
    const formaInicial = pieza.forma;

    pieza.rotarDerecha();
    expect(pieza.forma).toEqual([
      [1, 0],
      [1, 1],
      [1, 0],
    ]);

    pieza.rotarDerecha();
    expect(pieza.forma).toEqual([
      [1, 1, 1],
      [0, 1, 0],
    ]);

    pieza.rotarIzquierda();
    expect(pieza.forma).toEqual([
      [1, 0],
      [1, 1],
      [1, 0],
    ]);

    pieza.rotarIzquierda();
    expect(pieza.forma).toEqual(formaInicial);
  });

  test('PiezaPalo rota a vertical y regresa a horizontal', () => {
    const pieza = new PiezaPalo();
    const horizontal = pieza.forma;

    pieza.rotarDerecha();
    expect(pieza.forma).toEqual([
      [1],
      [1],
      [1],
      [1],
    ]);

    pieza.rotarIzquierda();
    expect(pieza.forma).toEqual(horizontal);
  });

  test('PiezaCuadrado mantiene su forma al rotar', () => {
    const pieza = new PiezaCuadrado();
    const formaInicial = pieza.forma;

    pieza.rotarDerecha();
    expect(pieza.forma).toEqual(formaInicial);

    pieza.rotarIzquierda();
    expect(pieza.forma).toEqual(formaInicial);
  });

  test('PiezaL rota 4 veces a la derecha y vuelve al inicio', () => {
    const pieza = new PiezaL();
    const formaInicial = pieza.forma;

    pieza.rotarDerecha();
    pieza.rotarDerecha();
    pieza.rotarDerecha();
    pieza.rotarDerecha();

    expect(pieza.forma).toEqual(formaInicial);
  });

  test('PiezaPerro rota a la derecha y luego a la izquierda', () => {
    const pieza = new PiezaPerro();
    const formaInicial = pieza.forma;

    pieza.rotarDerecha();
    expect(pieza.forma).toEqual([
      [1, 0],
      [1, 1],
      [0, 1],
    ]);

    pieza.rotarIzquierda();
    expect(pieza.forma).toEqual(formaInicial);
  });
});
