/* Day 2: Red-Nosed Reports
The unusual data (your puzzle input) consists of many reports, one report per line. 

Each report is a list of numbers called levels that are separated by spaces.

The engineers are trying to figure out which reports are safe.
The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. 

So, a report only counts as safe if both of the following are true:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.

*/

import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const lines = text.split("\n");
  let safeCount = 0;

  for (const line of lines) {
    const levels = line.split(' ').map(level => parseInt(level));
    if (levels.length === 0 || isNaN(levels[0])) {
      continue;
    }

    const differences = levels.slice(1)
      .map((level, index) => level - levels[index]);

    const isSafe = differences.every(difference => difference > 0 && difference <= 3) || 
      differences.every(difference => difference < 0 && difference >= -3);

    safeCount += isSafe ? 1 : 0;
  }

  console.log(`Safe reports: ${safeCount}`);
}

readInput();