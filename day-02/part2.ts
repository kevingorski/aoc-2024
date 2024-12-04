/* Day 2: Red-Nosed Reports

The Problem Dampener is a reactor-mounted module that lets the reactor safety systems
tolerate a single bad level in what would otherwise be a safe report. It's like the bad
level never happened!

*/

import { readAll } from "jsr:@std/io/read-all";

function areLevelsSafe(levels: number[]): boolean {
  const differences = levels.slice(1)
    .map((level, index) => level - levels[index]);

  return differences.every((difference) => difference > 0 && difference <= 3) ||
    differences.every((difference) => difference < 0 && difference >= -3);
}

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const lines = text.split("\n");
  let safeCount = 0;

  for (const line of lines) {
    const levels = line.split(" ").map((level) => parseInt(level));
    if (levels.length === 0 || isNaN(levels[0])) {
      continue;
    }

    let isSafe = areLevelsSafe(levels);
    let dampenedLevelIndex = 0;

    while (!isSafe && dampenedLevelIndex < levels.length) {
      const copiedLevels = [...levels];
      copiedLevels.splice(dampenedLevelIndex, 1);
      isSafe = areLevelsSafe(
        copiedLevels,
      );
      dampenedLevelIndex++;
    }

    safeCount += isSafe ? 1 : 0;
  }

  console.log(`Safe reports: ${safeCount}`);
}

readInput();
