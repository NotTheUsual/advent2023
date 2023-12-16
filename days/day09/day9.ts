import { isPresent, sum } from "../../_shared/utils";

const parseInput = (input: string): Array<Array<number>> => {
  return input.split('\n')
    .map((line) => {
      return line.split(' ').map(number => Number(number))
    });
}

function isNumber(item: number | undefined): item is number {
  return typeof item === 'number';
}

const guessNextValue = (sequence: Array<number>): number => {
  let hasFoundLimit = false;
  let differences: Array<Array<number>> = [];
  let sequenceToDiff = sequence;

  while (!hasFoundLimit) {
    const nextDifferences = sequenceToDiff.map((number, index) => {
      if (index === 0) return undefined;
      return number - sequenceToDiff[index - 1];
    }).filter(isNumber);
    differences.unshift(nextDifferences);
    sequenceToDiff = nextDifferences;
    if (nextDifferences.every(difference => difference === 0)) hasFoundLimit = true;
  }

  const finalDifference = differences.reduce((previous, differenceRow, index) => {
    if (index === 0) return previous;
    const nextDifference = (differenceRow.at(-1) || 0) + previous;
    return nextDifference;
  }, 0);

  return finalDifference + (sequence.at(-1) || 0);
};

export function solvePart1 (input: string): number {
  const values = parseInput(input);
  return values.map(guessNextValue).reduce(sum);
}
