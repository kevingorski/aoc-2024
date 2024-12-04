/* Day 3: Mull It Over

There are two new instructions you'll need to handle:

The do() instruction enables future mul instructions.
The don't() instruction disables future mul instructions.
Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.

*/

import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const instructions = text.matchAll(
    /(?:mul\((\d{1,3}),(\d{1,3})\))|(?:do\(\))|(?:don't\(\))/g);
  let isEnabled = true;
  let total = 0;

  for (const instruction of instructions) {
    const [match, x, y] = instruction;
    if (match.startsWith("don't")) {
      isEnabled = false;
    } else if (match.startsWith("do")) {
      isEnabled = true;
    } else if (isEnabled) {
      const result = parseInt(x) * parseInt(y);
      console.log(`${x} * ${y} = ${result}`);
      total += result;
    }
  }

  console.log(`Total: ${total}`);
}

readInput();