import { isPresent, sum } from '../../_shared/utils';

interface ParsedLine {
  winners: Array<string>;
  yours: Array<string>
}

const grabNumbers = (line: string): ParsedLine | null => {
  const match = line.match(/Card\s+\d+\: (.+) \| (.+)/);
  if (!match) return null;
  const [, winnerString, yourString] = match;
  return {
    winners: winnerString.split(' ').filter(isPresent),
    yours: yourString.split(' ').filter(isPresent)
  };
};

const calculateScore = (scores: ParsedLine): number => {
  let winCount = 0;
  
  for (const score of scores.yours) {
    if (scores.winners.includes(score)) {
      winCount += 1;
    }
  }

  if (!winCount) return 0;
  return Math.pow(2, winCount - 1);
}

export function solvePart1 (input: string): number {
  return input.split('\n')
    .map(grabNumbers)
    .filter(isPresent)
    .map(calculateScore)
    .reduce(sum);
}
