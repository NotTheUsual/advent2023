type Direction = 'R' | 'L';
interface Location {
  location: string;
  L: string;
  R: string;
}

interface Instructions {
  directions: Array<Direction>;
  locations: Record<string, Location>;
}

interface State {
  steps: number;
  location: string;
}

const parseLocations = (locationString: string) => {
  const locationDefinitions = locationString.split('\n');
  return locationDefinitions.reduce((map, locationDefinition) => {
    const matches = locationDefinition.match(/(\w\w\w)/g);
    if (!matches) throw new Error(`Couldn't match ${locationDefinition}`);
    const [location, left, right] = matches;
    map[location] = {
      location,
      L: left,
      R: right
    }
    return map;
  }, {} as Record<string, Location>);
}

const parseInput = (input: string) => {
  const [directionList, locationList] = input.split('\n\n');
  const directions = directionList.split('') as Array<Direction>;
  const locations = parseLocations(locationList);
  return { directions, locations };
}

const runDirections = (instructions: Instructions, state: State) => {
  for (const direction of instructions.directions) {
    state.steps += 1;
    state.location = instructions.locations[state.location][direction];
    if (state.location === 'ZZZ') return;
  }
}

const getFromAToZ = ({ directions, locations }: Instructions) => {
  const state = { steps: 0, location: 'AAA' };
  while (state.location !== 'ZZZ') {
    runDirections({ directions, locations }, state);
  }

  return state;
}

export function solvePart1 (input: string): number {
  const instructions = parseInput(input);
  const { steps } = getFromAToZ(instructions);
  return steps;
}
