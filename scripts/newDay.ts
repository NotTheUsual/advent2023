import shell from 'shelljs';
import dedent from 'dedent';
import minimist from 'minimist';

function generateNewDay() {
  const flags = minimist(process.argv.slice(2));

  const [dayNumber] = flags._;
  
  if (!dayNumber) {
    console.error('No day provided');
    process.exitCode = 1;
    return;
  }
  
  const day = `${dayNumber}`.padStart(2, '0');
  shell.exec(`mkdir days/day${day}`);
  shell.exec(`touch days/day${day}/day${dayNumber}{.input.,.test.,.}ts`);
  
  const starterCode = dedent`
    export function solvePart1 (input: string): number {
      return 0;
    }
  `;
  shell.exec(`echo "${starterCode}" >> days/day${day}/day${dayNumber}.ts`);
  
  const starterInput = dedent`
    const input = '';
    export default input;
  `;
  shell.exec(`echo "${starterInput}" >> days/day${day}/day${dayNumber}.input.ts`);
  
  const starterTest = dedent`
    import { expect, test, describe } from 'bun:test';
    import dedent from 'dedent';
    import { solvePart1 } from './day${dayNumber}';
    import day${dayNumber}Input from './day${dayNumber}.input';
    
    describe('Day ${dayNumber}', () => {
      describe('part 1', () => {
        test('test case', () => {
          const input = dedent'';
          expect(solvePart1(input)).toBe(198);
        });

        test.skip('real puzzle', () => {
          const result = solvePart1(day${dayNumber}Input);
          expect(result).toBe(2954600);
        });
      });
    });
  `;
  shell.exec(`echo "${starterTest}" >> days/day${day}/day${dayNumber}.test.ts`);
}

generateNewDay();
