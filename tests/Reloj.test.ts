import { describe, test, expect } from "vitest";
import { Reloj } from "../src/Reloj";

// ===========================================================================
// Requisito 4: Test del reloj
// a. Metodo tick del reloj (avanza). Contar de 1 en 1 el avance (no hay hora)
// ===========================================================================
describe("Reloj", () => {
  test("arranca en 0", () => {
    const reloj = new Reloj();
    expect(reloj.tomarTicks).toBe(0);
  });

  test("a. cada llamada a tick() incrementa el contador exactamente en 1", () => {
    const reloj = new Reloj();

    reloj.tick();
    expect(reloj.tomarTicks).toBe(1);

    reloj.tick();
    expect(reloj.tomarTicks).toBe(2);

    reloj.tick();
    expect(reloj.tomarTicks).toBe(3);
  });

  test("avanza de a 1 tras multiples ticks consecutivos", () => {
    const reloj = new Reloj();
    const totalTicks = 15;

    for (let i = 0; i < totalTicks; i++) {
      reloj.tick();
    }

    expect(reloj.tomarTicks).toBe(15);
  });
});
