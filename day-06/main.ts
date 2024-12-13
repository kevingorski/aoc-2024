/* Day 6: Guard Gallivant

The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map).
Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:
- If there is something directly in front of you, turn right 90 degrees.
- Otherwise, take a step forward.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?

*/

import { readAll } from "jsr:@std/io/read-all";

const guard = "^";
const obstacle = "#";

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

const turnRight = {
  [Direction.Up]: Direction.Right,
  [Direction.Right]: Direction.Down,
  [Direction.Down]: Direction.Left,
  [Direction.Left]: Direction.Up,
};

type MapSet = Map<number, Set<number>>;

function addToMapSet(mapSet: MapSet, key: number, value: number) {
  if (mapSet.has(key)) {
    mapSet.get(key)!.add(value);
  } else {
    mapSet.set(key, new Set([value]));
  }
}

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const rows = text.split("\n").map((row) => row.split(""));

  const rowObstacleIndicies = new Map<number, Set<number>>();
  const colObstacleIndicies = new Map<number, Set<number>>();
  let guardRowIndex: number | undefined;
  let guardColIndex: number | undefined;
  let guardDirection = Direction.Up;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const char = row[colIndex];
      if (char === obstacle) {
        addToMapSet(rowObstacleIndicies, rowIndex, colIndex);
        addToMapSet(colObstacleIndicies, colIndex, rowIndex);
      }
      if (char === guard) {
        guardRowIndex = rowIndex;
        guardColIndex = colIndex;
      }
    }
  }

  if (guardColIndex === undefined || guardRowIndex === undefined) {
    throw new Error("Guard not found");
  }

  const guardPositions = new Map<number, Set<number>>([
    [guardRowIndex, new Set([guardColIndex])],
  ]);
  let done = false;

  do {
    switch (guardDirection) {
      case Direction.Up:
        if (guardRowIndex === 0) {
          done = true;
          break;
        }
        if (colObstacleIndicies.get(guardColIndex)!.has(guardRowIndex - 1)) {
          guardDirection = turnRight[guardDirection];
          continue;
        }
        guardRowIndex--;
        addToMapSet(guardPositions, guardRowIndex, guardColIndex);
        break;
      case Direction.Right:
        if (guardColIndex === rows[0].length - 1) {
          done = true;
          break;
        }
        if (rowObstacleIndicies.get(guardRowIndex)!.has(guardColIndex + 1)) {
          guardDirection = turnRight[guardDirection];
          continue;
        }
        guardColIndex++;
        addToMapSet(guardPositions, guardRowIndex, guardColIndex);
        break;
      case Direction.Down:
        if (guardRowIndex === rows.length - 1) {
          done = true;
          break;
        }
        if (colObstacleIndicies.get(guardColIndex)!.has(guardRowIndex + 1)) {
          guardDirection = turnRight[guardDirection];
          continue;
        }
        guardRowIndex++;
        addToMapSet(guardPositions, guardRowIndex, guardColIndex);
        break;
      case Direction.Left:
        if (guardColIndex === 0) {
          done = true;
          break;
        }
        if (rowObstacleIndicies.get(guardRowIndex)!.has(guardColIndex - 1)) {
          guardDirection = turnRight[guardDirection];
          continue;
        }
        guardColIndex--;
        addToMapSet(guardPositions, guardRowIndex, guardColIndex);
        break;
    }
  } while (!done);

  const total = guardPositions.values().reduce((a, b) => a + b.size, 0);
  console.log(`Total: ${total}`);
}

readInput();
