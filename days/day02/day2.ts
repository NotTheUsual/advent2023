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

const processLineAgain = (line: string): number => {
  const reds = line.match(/\d+(?= red)/g);
  const greens = line.match(/\d+(?= green)/g);
  const blues = line.match(/\d+(?= blue)/g);

  if (!reds || !greens || !blues) return 0;

  const largestRed = Math.max(...reds.map(red => Number(red)));
  const largestGreen = Math.max(...greens.map(green => Number(green)));
  const largestBlue = Math.max(...blues.map(blue => Number(blue)));

  return largestRed * largestGreen * largestBlue;
}

export function solvePart2 (input: string): number {
  return input.split('\n')
    .map(processLineAgain)
    .reduce((total, value) => total + value);
}
