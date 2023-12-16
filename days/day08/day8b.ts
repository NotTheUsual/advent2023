type Direction = 'R' | 'L';
interface Location {
  location: string;
  L: string;
  R: string;
}

interface Instructions {
  directions: Array<Direction>;
  locations: Record<string, Location>;
  starts: Array<string>;
}

interface State {
  steps: number;
  location: string;
}

const matchLocation = (location: string, character: 'A' | 'Z'): boolean => {
  return location.split('').at(-1) === character;
}

const parseLocations = (locationString: string) => {
  const locationDefinitions = locationString.split('\n');
  
  const starts: Array<string> = [];

  const map = locationDefinitions.reduce((map, locationDefinition) => {
    const matches = locationDefinition.match(/(\w\w\w)/g);
    if (!matches) throw new Error(`Couldn't match ${locationDefinition}`);
    const [location, left, right] = matches;
    map[location] = {
      location,
      L: left,
      R: right
    }
    if (matchLocation(location, 'A')) starts.push(location);
    return map;
  }, {} as Record<string, Location>);

  return { map, starts };
}

const parseInput = (input: string): Instructions => {
  const [directionList, locationList] = input.split('\n\n');
  const directions = directionList.split('') as Array<Direction>;
  const locationInfo = parseLocations(locationList);
  return { directions, locations: locationInfo.map, starts: locationInfo.starts };
}

const runDirections = (instructions: Instructions, state: State) => {
  for (const direction of instructions.directions) {
    state.steps += 1;
    state.location = instructions.locations[state.location][direction];
    if (state.location === 'ZZZ') return;
  }
}

function* createRunner (instructions: Instructions, startingLocation: string) {
  const state = { steps: 0, location: startingLocation };
  while (true) {
    runDirections(instructions, state);
    yield state;
  }
}

export function solvePart2 (input: string): number {
  const instructions = parseInput(input);
  const runners = instructions.starts.map(start => createRunner(instructions, start));
  let answer = 0;
  while (answer === 0) {
    let step = 0;
    const done = runners.every((runner) => {
      const nextState = runner.next().value;
      if (!nextState) return false;
      step = nextState.steps;
      return matchLocation(nextState.location, 'Z');
    })
    if (done) answer = step;
  }
  return answer;
}
