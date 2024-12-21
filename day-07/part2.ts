/* Day 7: Bridge Repair Part 2

The concatenation operator (||) combines the digits from its left and right inputs into a single number.

*/

import { readAll } from "jsr:@std/io/read-all";

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function concat(a: number, b: number) {
  return parseInt(`${a}${b}`, 10);
}

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const lines = text.split("\n").map((line) => {
    const [_, result, values] = line.match(/(\d+): (.*)/)!;
    return {
      result: parseInt(result),
      values: values.split(" ").map((value) => parseInt(value)),
    };
  });
  let total = 0;


  for (const { result, values } of lines) {
    let possibleResults = [values[0]!];
    let i = 1;
    while (i < values.length) {
      const value = values[i]!;
      possibleResults = possibleResults.flatMap(r => [
        add(r, value),
        multiply(r, value),
        concat(r, value),]);
      i++;
    }

    if (possibleResults.includes(result)) {
      total += result;
    }
  }

  console.log(`Total: ${total}`);
}

readInput();
