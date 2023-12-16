import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1, solvePart2 } from './day9';
import day9Input from './day9.input';

describe('Day 9', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
      `;
      expect(solvePart1(input)).toBe(114);
    });

    test('real puzzle', () => {
      const result = solvePart1(day9Input);
      expect(result).toBe(2954600);
    });
  });

  describe('part 2', () => {
    test('test case', () => {
      const input = dedent`
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
      `;
      expect(solvePart2(input)).toBe(2);
    });

    test('real puzzle', () => {
      const result = solvePart2(day9Input);
      expect(result).toBe(2954600);
    });
  });
});
