import dedent from 'dedent';
import { solvePart1, solvePart2 } from './day1';
import { expect, test, describe } from 'bun:test';
import day1Input from './day.input';

describe('Day 1', () => {
  describe('part 1', () => {
    test('test case', () => {
      const input = dedent`
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
      `;
      expect(solvePart1(input)).toBe(142);
    });

    test('real puzzle', () => {
      expect(solvePart1(day1Input)).toBe(53974);
    });
  });

  describe('part 2', () => {
    test('test case', () => {
      const input = dedent`
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
      `;
      expect(solvePart2(input)).toBe(281);
    });

    test('real puzzle', () => {
      expect(solvePart2(day1Input)).toBe(52840);
    })
  });
});
