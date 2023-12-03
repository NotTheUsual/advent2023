import dedent from 'dedent';
import { solvePart1 } from './day1';
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
      expect(solvePart1(day1Input)).toBe(123);
    })
  });
});
