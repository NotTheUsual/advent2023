const grabCalibrationValue = (numbers: string) => {
  return Number(`${numbers.at(0)}${numbers.at(-1)}`);
}

export function solvePart1 (input: string): number {
  return input.split('\n')
    .map(line => line.replace(/\D/g, ''))
    .map(grabCalibrationValue)
    .reduce((total, value) => total + value);
}
