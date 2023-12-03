const LIMITS: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14
};

const processLine = (line: string): number => {
  const game = line.match(/Game (\d+)\:/);
  const pulls = line.match(/\d+\s\w+(?:,|\;)/g);
  if (!pulls || !game) return 0;

  for (const pull of pulls) {
    const match = pull.match(/(\d+) (\w+)(?:,|\;)/);
    if (!match) continue;
    
    const [, count, colour] = match;
    if (Number(count) > LIMITS[colour]) {
      return 0;
    }
  }

  return Number(game[1]);
}

export function solvePart1 (input: string): number {
  return input.split('\n')
    .map(processLine)
    .reduce((total, value) => total + value);
}
