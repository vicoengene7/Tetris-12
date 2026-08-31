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

  test("cada tick avanza de a 1", () => {
    const reloj = new Reloj();
    reloj.tick();
    expect(reloj.tomarTicks).toBe(1);
  });
});
