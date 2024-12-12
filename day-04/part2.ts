/* Day 4: Ceres Search Part 2

Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle;
it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X.

One way to achieve that is like this:

M.S
.A.
M.S

Within the X, each MAS can be written forwards or backwards.

*/

import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const rows = text.split("\n").map((row) => row.split(""));

  let total = 0;

  for (let rowIndex = 1; rowIndex < rows.length - 1; rowIndex++) {
    const row = rows[rowIndex];
    for (let colIndex = 1; colIndex < row.length - 1; colIndex++) {
      const char = row[colIndex];

      if (char !== "A") continue;

      const cross = [
        rows[rowIndex - 1][colIndex - 1],
        rows[rowIndex + 1][colIndex - 1],
        rows[rowIndex - 1][colIndex + 1],
        rows[rowIndex + 1][colIndex + 1],
      ];

      if (cross.filter((char) => char === "M").length !== 2) continue;
      if (cross.filter((char) => char === "S").length !== 2) continue;

      const [topLeft, bottomLeft, topRight, bottomRight] = cross;

      if (
        (topLeft === "M" && bottomRight === "M") ||
        (topRight === "M" && bottomLeft === "M")
      ) continue;

      total++;
    }
  }

  console.log(`Total: ${total}`);
}

readInput();
