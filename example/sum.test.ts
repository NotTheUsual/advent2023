import { expect, test } from 'bun:test';
import sum from './sum';

test('adds two numbers together', () => {
  expect(sum(1, 2)).toEqual(3);
});
