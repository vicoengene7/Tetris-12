import { describe, expect, test } from 'vitest';
import { Tetris } from '../src/Tetris';

describe("Tetris", () => {

  test("crear una instancia de Tetris", () => {
    
    var tetris1 = new Tetris();

    expect(tetris1).not.toBeNull();
  });

});
