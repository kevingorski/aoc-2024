/* Day 3: Mull It Over

Scan the corrupted memory for uncorrupted mul instructions.

It seems like the goal of the program is just to multiply some numbers.
It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers.

However, because the program's memory has been corrupted, there are also many invalid
characters that should be ignored, even if they look like part of a mul instruction.
Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.

What do you get if you add up all of the results of the multiplications?

*/

import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const instructions = text.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  let total = 0;

  for (const instruction of instructions) {
    const [_, x, y] = instruction;
    const result = parseInt(x) * parseInt(y);
    console.log(`${x} * ${y} = ${result}`);
    total += result;
  }

  console.log(`Total: ${total}`);
}

readInput();
