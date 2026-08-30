import { describe, test, expect } from "vitest";
import { Reloj } from "../src/Reloj";

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

  test("varios ticks acumulan correctamente", () => {
    const reloj = new Reloj();
    reloj.tick();
    reloj.tick();
    reloj.tick();
    expect(reloj.tomarTicks).toBe(3);
  });

});