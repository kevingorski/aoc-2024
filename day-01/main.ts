// Day 1: Historian Hysteria
// Input: list of integer location ID whitespace-separated pairs, pair per line

/*
There's just one problem: by holding the two lists up side by side (your puzzle input), it quickly becomes clear that the lists aren't very similar.

To find out, pair up the numbers and measure how far apart they are.
Pair up the smallest number in the left list with the smallest number in the right list,
then the second-smallest left number with the second-smallest right number, and so on.

Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances.

For example, if you pair up a 3 from the left list with a 7 from the right list, the distance apart is 4; if you pair up a 9 with a 3, the distance apart is 6.

To find the total distance between the left list and the right list, add up the distances between all of the pairs you found.

*/

import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);

  const lines = text.split("\n");

  // NB: A different data structure would make this more efficient
  const left: number[] = [];
  const right: number[] = [];

  for (const line of lines) {
    const [leftStr, rightStr] = line.split(/\s+/);
    if (leftStr.length === 0 || rightStr.length === 0) {
      continue;
    }
    left.push(parseInt(leftStr));
    right.push(parseInt(rightStr));
  }

  const leftSorted = left.sort((a, b) => a - b);
  const rightSorted = right.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < leftSorted.length; i++) {
    totalDistance += Math.abs(leftSorted[i] - rightSorted[i]);
  }

  console.log(`Total distance: ${totalDistance}`);
}

readInput();
