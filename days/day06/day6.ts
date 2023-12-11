interface Record {
  time: number;
  distance: number;
}

const parseInput = (input: string): Array<Record> => {
  const [timesLine, distancesLine] = input.split('\n');
  const times = timesLine.match(/\d+/g);
  const distances = distancesLine.match(/\d+/g);
  if (!times || !distances) throw new Error('Something went wrong');
  
  return times.map((timeString, index) => {
    return {
      time: Number(timeString),
      distance: Number(distances[index])
    }
  })
}

const countOptionsThatBeatRecord = (record: Record): number => {
  let count = 0;

  for (let holdTime = 0; holdTime < record.time; holdTime += 1) {
    const distance = holdTime * (record.time - holdTime);
    if (distance > record.distance) {
      count += 1;
    } else {
      if (count > 0) return count;
    }
  }

  return count;
}

export function solvePart1 (input: string): number {
  const records = parseInput(input);
  
  const counts = records.map(countOptionsThatBeatRecord);

  return counts.reduce((total, count) => total * count, 1);
}

const parseInput2 = (input: string): Record => {
  const [timesLine, distancesLine] = input.split('\n');
  const times = timesLine.match(/\d/g);
  const distances = distancesLine.match(/\d/g);
  if (!times || !distances) throw new Error('Something went wrong');
  return {
    time: Number(times.join('')),
    distance: Number(distances.join(''))
  };
}

export function solvePart2 (input: string): number {
  const record = parseInput2(input);
  
  return countOptionsThatBeatRecord(record);
}
