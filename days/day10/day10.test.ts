import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1 } from './day10';
import day10Input from './day10.input';

describe('Day 10', () => {
  describe('part 1', () => {
    test('test case 1', () => {
      const input = dedent`
        .....
        .S-7.
        .|.|.
        .L-J.
        .....
      `;
      expect(solvePart1(input)).toBe(4);
    });
    
    test('test case 2', () => {
      const input = dedent`
        ..F7.
        .FJ|.
        SJ.L7
        |F--J
        LJ...
      `;
      expect(solvePart1(input)).toBe(8);
    });

    test('real puzzle', () => {
      const result = solvePart1(day10Input);
      expect(result).toBe(6882);
    });
  });
});
