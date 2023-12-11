const guaranteedMatch = (input: string, matcher: RegExp): RegExpMatchArray => {
  const match = input.match(matcher);
  if (!match) throw new Error(`Failed to match ${input} with ${matcher}`);
  return match;
}

const parseNumbers = (line: string): Array<number> => {
  const match = guaranteedMatch(line, /\d+/g);
  return match.map(seed => Number(seed));
}

const parseSeeds = (seedLine: string): Array<number> => {
  return parseNumbers(seedLine);
}

interface Mapping {
  sourceStart: number;
  destinationStart: number;
  range: number;
}

interface ParsedMap {
  from: string;
  to: string;
  mappings: Array<Mapping>;
}

declare global  {
  interface ProxyConstructor {
      new <TSource extends object, TTarget extends object>(target: TSource, handler: ProxyHandler<TSource>): TTarget;
  }
}

const createLookup = (mappings: Array<Mapping>) => {
  return new Proxy<Mapping[], Record<string, number>>(mappings, {
    get(target, prop): number {
      if (Number.isNaN(Number(prop))) return 0;
      const propAsNumber = Number(prop);
      const relevantMapping = target.find(mapping => propAsNumber >= mapping.sourceStart);
      if (!relevantMapping) return propAsNumber;
      const difference = propAsNumber - relevantMapping.sourceStart;
      if (difference >= relevantMapping.range) return propAsNumber;
      return relevantMapping.destinationStart + difference;
    }
  })
}

const parseMapping = (ranges: string): Mapping => {
  const [destinationStart, sourceStart, range] = parseNumbers(ranges);
  return {
    sourceStart,
    destinationStart,
    range
  }
}

const parseMap = (map: string): ParsedMap => {
  const [title, ...ranges] = map.split('\n');
  const [, from, to] = guaranteedMatch(title,/(\w+)-to-(\w+) map/);

  return {
    from,
    to,
    mappings: ranges.map(parseMapping).sort((a, b) => b.sourceStart - a.sourceStart)

  }
}

const locationForSeed = (seed: number, maps: Array<ParsedMap>): number => {
  let nextSource = seed;

  for (const map of maps) {
    const lookup = createLookup(map.mappings);
    nextSource = lookup[nextSource];
  }

  return nextSource;
}

const parseInput = (input: string) => {
  const [seedLine, ...mapLines] = input.split('\n\n');
  const seeds = parseSeeds(seedLine);
  const maps = mapLines.map(map => parseMap(map));

  return { seeds, maps };
}

const findNearestLocation = ({ seeds, maps }: { seeds: Array<number>; maps: Array<ParsedMap> }): number => {
  const seedLocations = seeds.reduce((locations, seed) => {
    locations[seed] = locationForSeed(seed, maps);
    return locations;
  }, {} as Record<string, number>)

  const sorted = Object.values(seedLocations).sort((a, b) => a - b);
  
  return sorted[0];
}

export function solvePart1 (input: string): number {
  const { seeds, maps } = parseInput(input);
  return findNearestLocation({ seeds, maps });
}
