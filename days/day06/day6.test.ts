import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1, solvePart2 } from './day6';
import day6Input from './day6.input';

describe('Day 6', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        Time:      7  15   30
        Distance:  9  40  200
      `;
      expect(solvePart1(input)).toBe(288);
    });

    test('real puzzle', () => {
      const result = solvePart1(day6Input);
      expect(result).toBe(114400);
    });
  });

  describe('part 2', () => {
    test('test case', () => {
      const input = dedent`
        Time:      7  15   30
        Distance:  9  40  200
      `;
      expect(solvePart2(input)).toBe(71503);
    });

    test('real puzzle', () => {
      const result = solvePart2(day6Input);
      expect(result).toBe(21039729);
    });
  });
});
