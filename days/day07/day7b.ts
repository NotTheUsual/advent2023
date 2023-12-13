interface Hand {
  cards: Array<string>;
  bid: number;
}

const rankedHandTypes = [
  'HIGH_CARD',
  'ONE_PAIR',
  'TWO_PAIR',
  'THREE_OF_A_KIND',
  'FULL_HOUSE',
  'FOUR_OF_A_KIND',
  'FIVE_OF_A_KIND'
] as const;

type HandType = (typeof rankedHandTypes)[number];

const cardRanks = ['J', '2', '3', '4', '5', '6', '7', '8', '8', '9', 'T', 'Q', 'K', 'A'];

const adjustForJokers = (counts: Array<number>, jokerCount: number): Array<number> => {
  if (!jokerCount) return counts;
  
  for (let joker = 1; joker <= jokerCount; joker += 1) {
    const highestCard = counts.at(-1);

    if (!highestCard) {
      counts.unshift(1);
      continue;
    }

    if (highestCard !== 5) {
      counts[counts.length - 1] = counts[counts.length - 1] + 1;
      continue;
    }

    if (!counts.at(-2)) {
      counts.unshift(1);
      continue;
    }

    counts[counts.length - 2] = counts[counts.length - 2] + 1;
  }

  return counts;
}

const typeForHand = (hand: Hand): HandType => {
  const allCounts = hand.cards.reduce((store, card) => {
    store[card] ||= 0;
    store[card] += 1;
    return store;
  }, {} as Record<string, number>);
  const { J: jokerCount, ...counts } = allCounts;
  const sortedCounts = Object.values(counts).sort();
  const adjustedCounts = adjustForJokers(sortedCounts, jokerCount)
  const countScore = adjustedCounts.join('');

  switch (countScore) {
    case '5': return 'FIVE_OF_A_KIND';
    case '14': return 'FOUR_OF_A_KIND';
    case '23': return 'FULL_HOUSE';
    case '113': return 'THREE_OF_A_KIND';
    case '122': return 'TWO_PAIR';
    case '1112': return 'ONE_PAIR';
    case '11111': return 'HIGH_CARD';
  }

  throw new Error(`Unkown hand score ${countScore}`);
}

const parseInput = (input: string): Array<Hand> => {
  return input.split('\n')
    .map(line => {
      const [cardString, bidString] = line.split(' ');
      return {
        cards: cardString.split(''),
        bid: Number(bidString)
      }
    })
}

const byCardRank = (a: Hand, b: Hand): number => {
  for (let index = 0; index < a.cards.length; index += 1) {
    const difference = cardRanks.indexOf(a.cards[index]) - cardRanks.indexOf(b.cards[index]);
    if (difference === 0) continue;
    return difference;
  }
  return 0;
}

const rankHands = (hands: Array<Hand>) => {
  const typedHands = hands.reduce((scores, hand) => {
    const type = typeForHand(hand);
    scores[type] ||= [];
    scores[type]?.push(hand);
    return scores;
  }, {} as Partial<Record<HandType, Array<Hand>>>);

  let rankedHands: Array<Hand> = [];

  for (const type of rankedHandTypes) {
    const handsForType = typedHands[type];
    if (!handsForType) continue;

    const sortedHands = handsForType.toSorted(byCardRank);
    rankedHands = rankedHands.concat(sortedHands);
  }

  return rankedHands;
}

const scoreHands = (hands: Array<Hand>): number => {
  return hands.reduce((total, hand, index) => {
    const score = hand.bid * (index + 1);
    return total + score;
  }, 0);
};

export function solvePart2 (input: string): number {
  const hands = parseInput(input);
  const rankedHands = rankHands(hands);

  // 251478384 - too high
  return scoreHands(rankedHands);
}
