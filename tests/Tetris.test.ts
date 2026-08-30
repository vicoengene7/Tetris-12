import { describe, expect, test } from 'vitest';
import { Tetris } from '../src/Tetris';

// ===========================================================================
// Requisito 8: Que se pueda crear un juego Tetris
// a. Poder crear y comenzar
// b. Poder indicar desde afuera que se cree un "tick" del reloj
// c. Que en cada tick se juegue en el tablero el movimiento
// ===========================================================================
describe('8. Juego Tetris', () => {
  test('a. poder crear una instancia y comenzar el juego', () => {
    const tetris = new Tetris();
    expect(tetris).toBeDefined();

    // comenzar el juego agrega la primera pieza activa en el tablero
    const iniciado = tetris.empezar();
    expect(iniciado).toBe(true);

    const tablero = tetris.tomarTablero();
    expect(tablero.cuadriculaConPiezaActiva.some(celda => celda === 1)).toBe(true);
  });

  test('b. poder indicar desde afuera que se cree un "tick" del reloj y retorne el conteo', () => {
    const tetris = new Tetris();
    tetris.empezar();

    const tick1 = tetris.tick();
    expect(tick1).toBe(1);

    const tick2 = tetris.tick();
    expect(tick2).toBe(2);

    const tick3 = tetris.tick();
    expect(tick3).toBe(3);
  });

  test('c. en cada tick se ejecuta en el tablero el movimiento descendente de la pieza', () => {
    const tetris = new Tetris();
    tetris.empezar();

    const tablero = tetris.tomarTablero();
    const estadoInicial = [...tablero.cuadriculaConPiezaActiva];

    // Al hacer un tick, la pieza debe haber bajado una fila
    tetris.tick();
    const estadoLuegoDeTick = tablero.cuadriculaConPiezaActiva;

    // El estado del tablero debió cambiar respecto al estado inicial
    expect(estadoLuegoDeTick).not.toEqual(estadoInicial);
  });

  test('c. tras suficientes ticks, las piezas descienden, se fijan y se agregan nuevas piezas', () => {
    const tetris = new Tetris();
    tetris.empezar();

    for (let i = 0; i < 25; i++) {
      tetris.tick();
    }

    const tablero = tetris.tomarTablero();
    expect(tablero.cuadricula.some(celda => celda === 1)).toBe(true);
  });
});
