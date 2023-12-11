import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1 } from './day5';
import day5Input from './day5.input';

describe('Day 5', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48

        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15

        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4

        water-to-light map:
        88 18 7
        18 25 70

        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13

        temperature-to-humidity map:
        0 69 1
        1 0 69

        humidity-to-location map:
        60 56 37
        56 93 4
      `;
      expect(solvePart1(input)).toBe(35);
    });

    test('real puzzle', () => {
      const result = solvePart1(day5Input);
      expect(result).toBe(177942185);
    });
  });
});
