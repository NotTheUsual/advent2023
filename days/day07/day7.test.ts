import { expect, test, describe } from 'bun:test';
import dedent from 'dedent';
import { solvePart1 } from './day7';
import { solvePart2 } from './day7b';
import day7Input from './day7.input';

describe('Day 7', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`;
      expect(solvePart1(input)).toBe(6440);
    });

    test('real puzzle', () => {
      const result = solvePart1(day7Input);
      expect(result).toBe(251029473);
    });
  });

  describe('part 2', () => {
    test('test case', () => {
      const input = dedent`
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`;
      expect(solvePart2(input)).toBe(5905);
    });

    test('real puzzle', () => {
      const result = solvePart2(day7Input);
      expect(result).toBe(251003917);
    });
  });
});
