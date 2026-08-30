import { describe, expect, test } from 'vitest';
import { Tablero } from '../src/Tablero';
import { PiezaPalo } from '../src/PiezaPalo';
import { PiezaCuadrado } from '../src/PiezaCuadrado';
import { PiezaT } from '../src/PiezaT';
import { PiezaL } from '../src/PiezaL';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function bajar(tablero: Tablero, veces: number): void {
  for (let i = 0; i < veces; i++) tablero.moverAbajo();
}

// ---------------------------------------------------------------------------
// Escenario 1: PiezaPalo horizontal cae al fondo sin obstaculos
// Preset:  columna 3, rotacion 0  ([1,1,1,1])
// Inputs:  moverAbajo x19
// ---------------------------------------------------------------------------
describe('Escenario 1 — PiezaPalo cae al fondo', () => {

  test('se agrega en columna 3, rotacion 0', () => {
    const tablero = new Tablero();
    expect(tablero.añadirPiezaEn(new PiezaPalo(), 3, 0)).toBe(true);
  });

  test('baja 18 veces (ok) y en la 19 se fija', () => {
    const tablero = new Tablero();
    tablero.añadirPiezaEn(new PiezaPalo(), 3, 0);
    for (let i = 0; i < 18; i++) expect(tablero.moverAbajo()).toBe(true);
    expect(tablero.moverAbajo()).toBe(false);
    const g = tablero.cuadricula;
    expect(g[19 * 10 + 3]).toBe(1);
    expect(g[19 * 10 + 4]).toBe(1);
    expect(g[19 * 10 + 5]).toBe(1);
    expect(g[19 * 10 + 6]).toBe(1);
  });

});

// ---------------------------------------------------------------------------
// Escenario 2: PiezaCuadrado en esquina inferior izquierda
// Preset:  columna 0, rotacion 0
// Inputs:  moverAbajo hasta el fondo
// ---------------------------------------------------------------------------
describe('Escenario 2 — PiezaCuadrado en esquina inferior izquierda', () => {

  test('se fija en filas 18-19, cols 0-1', () => {
    const tablero = new Tablero();
    tablero.añadirPiezaEn(new PiezaCuadrado(), 0, 0);
    bajar(tablero, 19);
    const g = tablero.cuadricula;
    expect(g[18 * 10 + 0]).toBe(1);
    expect(g[18 * 10 + 1]).toBe(1);
    expect(g[19 * 10 + 0]).toBe(1);
    expect(g[19 * 10 + 1]).toBe(1);
  });

});

// ---------------------------------------------------------------------------
// Escenario 3: PiezaT con rotacion inicial 2, luego rotar derecha
// Preset:  columna 4, rotacion 2  ([[1,1,1],[0,1,0]])
// Inputs:  rotarDerecha()
// ---------------------------------------------------------------------------
describe('Escenario 3 — PiezaT rotacion 2 y luego rotarDerecha', () => {

  test('aparece con forma de rotacion 2 (punta hacia abajo)', () => {
    const tablero = new Tablero();
    tablero.añadirPiezaEn(new PiezaT(), 4, 2);
    const g = tablero.cuadriculaConPiezaActiva;
    expect(g[0 * 10 + 4]).toBe(1);
    expect(g[0 * 10 + 5]).toBe(1);
    expect(g[0 * 10 + 6]).toBe(1);
    expect(g[1 * 10 + 5]).toBe(1);
  });

  test('rotarDerecha cambia a rotacion 3', () => {
    const tablero = new Tablero();
    tablero.añadirPiezaEn(new PiezaT(), 4, 2);
    tablero.rotarDerecha();
    const g = tablero.cuadriculaConPiezaActiva;
    expect(g[0 * 10 + 5]).toBe(1);
    expect(g[1 * 10 + 4]).toBe(1);
    expect(g[1 * 10 + 5]).toBe(1);
    expect(g[2 * 10 + 5]).toBe(1);
  });

});

// ---------------------------------------------------------------------------
// Escenario 4: PiezaL cae, rota a mitad de caida y termina al fondo
// Preset:  columna 0, rotacion 1
// Inputs:  moverAbajo x5, rotarIzquierda, moverAbajo hasta el fondo
// ---------------------------------------------------------------------------
describe('Escenario 4 — PiezaL rota en el aire y se fija', () => {

  test('rota en el aire sin explotar y queda fijada', () => {
    const tablero = new Tablero();
    tablero.añadirPiezaEn(new PiezaL(), 0, 1);
    bajar(tablero, 5);
    expect(tablero.rotarIzquierda()).toBe(true);
    let ticks = 0;
    while (tablero.moverAbajo() && ticks++ < 20);
    expect(tablero.cuadricula.some(c => c === 1)).toBe(true);
  });

});

// ---------------------------------------------------------------------------
// Escenario 5: Limpiar una linea completa
// Se llenan los 10 casilleros de la ultima fila y se verifica que se limpia
// ---------------------------------------------------------------------------
describe('Escenario 5 — Limpiar linea completa', () => {

  test('dos PiezaPalo + PiezaCuadrado llenan la fila 19 y se limpia', () => {
    const tablero = new Tablero();

    // cols 0-3
    tablero.añadirPiezaEn(new PiezaPalo(), 0, 0);
    bajar(tablero, 19);

    // cols 4-7
    tablero.añadirPiezaEn(new PiezaPalo(), 4, 0);
    bajar(tablero, 19);

    // todavia falta cols 8-9 → no limpia
    expect(tablero.limpiarLinea()).toBe(0);

    // cols 8-9 (cuadrado ocupa 2 filas pero llena la ultima)
    tablero.añadirPiezaEn(new PiezaCuadrado(), 8, 0);
    bajar(tablero, 19);

    expect(tablero.limpiarLinea()).toBeGreaterThanOrEqual(1);
  });

});
