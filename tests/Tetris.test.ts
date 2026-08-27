import { describe, it, expect } from 'vitest';
import { Tetris } from '../src/Tetris';

describe('Tetris', () => {
  it('debería crear una instancia de Tetris', () => {
    const t = new Tetris();

    expect(t).not.toBeNull();
  });
});