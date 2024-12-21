/* Day 7: Bridge Repair

Each line represents a single equation. The test value appears before the colon on each line;
it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.

Operators are always evaluated left-to-right, not according to precedence rules.
Furthermore, numbers in the equations cannot be rearranged.
Glancing into the jungle, you can see elephants holding two different types of operators: add (+) and multiply (*).

The engineers just need the total calibration result, which is the sum of the test values from just the equations that could possibly be true.

*/

import { readAll } from "jsr:@std/io/read-all";

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
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
        multiply(r, value),]);
      i++;
    }

    if (possibleResults.includes(result)) {
      total += result;
    }
  }

  console.log(`Total: ${total}`);
}

readInput();
