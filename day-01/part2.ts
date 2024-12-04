/*
This time, you'll need to figure out exactly how often each number from the left list
appears in the right list. Calculate a total similarity score by adding up each number
in the left list after multiplying it by the number of times that number appears in the right list
*/
import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);

  const lines = text.split("\n");

  // NB: A different data structure would make this more efficient
  const left: number[] = [];
  const right = new Map<number, number>();

  for (const line of lines) {
    const [leftStr, rightStr] = line.split(/\s+/);
    if (leftStr.length === 0 || rightStr.length === 0) {
      continue;
    }
    left.push(parseInt(leftStr));

    const rightValue = parseInt(rightStr);
    if (right.has(rightValue)) {
      right.set(rightValue, right.get(rightValue)! + 1);
    } else {
      right.set(rightValue, 1);
    }
  }

  const similarityScore = left.reduce(
    (acc, num) => acc + (num * (right.get(num) ?? 0)),
    0,
  );

  console.log(`Similarity score: ${similarityScore}`);
}

readInput();
