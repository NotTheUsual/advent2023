import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1 } from './day8';
import { solvePart2 } from './day8b';
import day8Input from './day8.input';

describe('Day 8', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)
      `;
      expect(solvePart1(input)).toBe(2);
    });

    test('test case 2', () => {
      const input = dedent`
        LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)
      `;
      expect(solvePart1(input)).toBe(6);
    });

    test('real puzzle', () => {
      const result = solvePart1(day8Input);
      expect(result).toBe(13939);
    });
  });

  describe('part 2', () => {
    test('test case', () => {
      const input = dedent`
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)
      `;
      expect(solvePart2(input)).toBe(6);
    });

    test.skip('real puzzle', () => {
      const result = solvePart2(day8Input);
      expect(result).toBe(13939);
    });
  });
});
