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

const countWinsIn = (scores: ParsedLine): number => {
  let winCount = 0;
  
  for (const score of scores.yours) {
    if (scores.winners.includes(score)) {
      winCount += 1;
    }
  }

  return winCount;
};

const calculateScore = (scores: ParsedLine): number => {
  const winCount = countWinsIn(scores);
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



export function solvePart2 (input: string): number {
  const cards = input.split('\n').map(grabNumbers).filter(isPresent).map(card => [card]);

  for (let index = 0; index < cards.length; index += 1) {
    const card = cards[index][0];
    const wins = countWinsIn(card);

    if (!wins) continue;
    
    for (const _ of cards[index]) {
      for (let win = 1; win <= wins; win += 1) {
        cards[index + win].push(cards[index + 1][0]);
      }
    }
  }

  return cards.map(duplicates => duplicates.length).reduce(sum);
}
