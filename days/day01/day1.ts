const sum = (total: number, value: number) => total + value;

const grabCalibrationValue = (numbers: string) => {
  return Number(`${numbers.at(0)}${numbers.at(-1)}`);
}

export function solvePart1 (input: string): number {
  return input.split('\n')
    .map(line => line.replace(/\D/g, ''))
    .map(grabCalibrationValue)
    .reduce(sum);
}

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const isNumber = (character: string) => !Number.isNaN(Number(character));

const getFirstNumber = (line: string): number => {
  for (let index = 0; index < line.length; index += 1) {
    const character = line.at(index);
    if (!character) continue;
    
    if (isNumber(character)) {
      return Number(character);
    }

    const substring = line.slice(index);
    const stringNumber = NUMBERS.find(number => substring.startsWith(number));
    if (stringNumber) {
      return NUMBERS.indexOf(stringNumber);
    }
  }
  return -1;
}

const getLastNumber = (line: string): number => {
  for (let index = line.length - 1; index >= 0; index -= 1) {
    const character = line.at(index);
    if (!character) continue;
    
    if (isNumber(character)) {
      return Number(character);
    }

    const substring = line.slice(0, index + 1);
    const stringNumber = NUMBERS.find(number => substring.endsWith(number));
    if (stringNumber) {
      return NUMBERS.indexOf(stringNumber);
    }
  }
  return -1;
}

const processLine = (line: string) => {
  const first = getFirstNumber(line);
  const last = getLastNumber(line);
  return Number(`${first}${last}`);
}

export function solvePart2 (input: string): number {
  return input.split('\n')
    .map(processLine)
    .reduce(sum);
}
