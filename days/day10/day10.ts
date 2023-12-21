interface Point {
  x: number;
  y: number;
  value: string;
}

type Grid = Array<Array<Point>>;

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

const parseInput = (input: string) => {
  let startPoint: Point | undefined = undefined;
  
  const grid = input.split('\n').map((row, rowIndex) => {
    return row.split('').map((cell, cellIndex) => {
      const point = {
        x: cellIndex,
        y: rowIndex,
        value: cell
      };
      if (cell === 'S') {
        startPoint = point;
      }
      return point;
    })
  });

  if (!startPoint) throw new Error('Failed to find start point');

  return {
    grid,
    startPoint
  }
};

const createGridFinder = (grid: Grid) => ({ x, y }: { x: number; y: number }) => {
  return grid.at(y)?.at(x);
};

const findSecondPoint = ({ grid, startPoint }: { grid: Grid; startPoint: Point }): Point => {
  const valueAtPoint = createGridFinder(grid);
  
  const north = valueAtPoint({ x: startPoint.x, y: startPoint.y - 1 });
  if (north && (north.value === '|' || north.value === '7' || north.value === 'F')) {
    return north;
  }
  const east = valueAtPoint({ x: startPoint.x + 1, y: startPoint.y });
  if (east && (east.value === '-' || east.value === 'J' || east.value === '7')) {
    return east;
  }
  const south = valueAtPoint({ x: startPoint.x, y: startPoint.y + 1 });
  if (south && (south.value === '|' || south.value === 'J' || south.value === 'L')) {
    return south;
  }
  const west = valueAtPoint({ x: startPoint.x - 1, y: startPoint.y });
  if (west && (west.value === '-' || west.value === 'L' || west.value === 'F')) {
    return west;
  }
  throw new Error('failed to find starting point');
};

const samePoint = (pointA?: Point, pointB?: Point): boolean => {
  return pointA?.x === pointB?.x && pointA?.y === pointB?.y;
}

function pointExists (point?: Point): asserts point {
  if (!point) throw new Error('Unexpected missing point...');
}

const createStepFinder = (grid: Grid) => {
  const valueAtPoint = createGridFinder(grid);

  return (loop: Array<Point>): void => {
    const currentPoint = loop.at(-1);
    const previousPoint = loop.at(-2);
    if (!currentPoint || !previousPoint) throw new Error(`I messed up the looping code: ${JSON.stringify(loop)}`);

    const north = valueAtPoint({ x: currentPoint.x, y: currentPoint.y - 1 });
    const east = valueAtPoint({ x: currentPoint.x + 1, y: currentPoint.y });
    const south = valueAtPoint({ x: currentPoint.x, y: currentPoint.y + 1 });
    const west = valueAtPoint({ x: currentPoint.x - 1, y: currentPoint.y });
    
    let next: Point | undefined = undefined;
    switch (currentPoint.value) {
      case '|':
        next = samePoint(previousPoint, north) ? south : north;
        break;
      case '-':
        next = samePoint(previousPoint, west) ? east : west;
        break;
      case 'L':
        next = samePoint(previousPoint, north) ? east : north;
        break;
      case 'J':
        next = samePoint(previousPoint, north) ? west : north;
        break;
      case '7':
        next = samePoint(previousPoint, south) ? west : south;
        break;
      case 'F':
        next = samePoint(previousPoint, south) ? east : south;
        break;
    }

    // console.log(previousPoint, currentPoint, next);

    pointExists(next);
    loop.push(next);
  }
};

const grabLoop = ({ grid, startPoint }: { grid: Grid; startPoint: Point }) => {
  const loop: Array<Point> = [startPoint];
  const secondPoint = findSecondPoint({ grid, startPoint });
  loop.push(secondPoint);

  const addNextStepTo = createStepFinder(grid);
  
  while (loop.at(-1)?.value !== 'S' ) {
    addNextStepTo(loop);
  }
  
  return loop;
}

export function solvePart1 (input: string): number {
  const setup = parseInput(input);
  const loop = grabLoop(setup);
  return (loop.length - 1) / 2;
}
