import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1, solvePart2 } from './day2';
import day2Input from './day2.input';

describe('Day 2', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
      `;
      expect(solvePart1(input)).toBe(8);
    });

    test('real puzzle', () => {
      const result = solvePart1(day2Input);
      expect(result).toBe(2879);
    });
  });

  describe('part 2', () => {
    test('test case', () => {
      const input = dedent`
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
      `;
      expect(solvePart2(input)).toBe(2286);
    });

    test('real puzzle', () => {
      const result = solvePart2(day2Input);
      expect(result).toBe(65122);
    });
  });
});
