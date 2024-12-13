/* Day 5: Print Queue

The notation X|Y means that if both page number X and page number Y are to be produced as part of an update,
page number X must be printed at some point before page number Y.

The Elf has for you both the page ordering rules and the pages to produce in each update (your puzzle input),
but can't figure out whether each update has the pages in the right order.

To get the printers going as soon as possible, start by identifying which updates are already in the right order.

For some reason, the Elves also need to know the middle page number of each update being printed.
Because you are currently only printing the correctly-ordered updates, you will need to find the middle page number of each correctly-ordered update.

What do you get if you add up the middle page number from those correctly-ordered updates?
*/

import { readAll } from "jsr:@std/io/read-all";

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const [rulesText, pageListsText] = text.split("\n\n");

  let total = 0;

  // Parse the rules
  const rulePairs = rulesText.split("\n").map((line) =>
    line.split("|").map((value) => Number(value))
  );
  const rules = new Map<number, Set<number>>();

  for (const [first, second] of rulePairs) {
    if (rules.has(first)) {
      rules.get(first)!.add(second);
    } else {
      rules.set(first, new Set([second]));
    }
  }

  // Parse the page lists
  const pageLists = pageListsText.split("\n").map((line) =>
    line.split(",").map((value) => Number(value))
  );

  for (const pageList of pageLists) {
    const seenPages = new Set<number>();
    // finding first, has second been seen already? -> fail
    for (const value of pageList) {
      if (rules.has(value)) {
        if (rules.get(value)!.intersection(seenPages).size > 0) {
          break;
        }
      }
      seenPages.add(value);
    }

    if (seenPages.size === pageList.length) {
      const middleIndex = Math.floor(pageList.length / 2);
      total += pageList[middleIndex];
    }
  }

  console.log(`Total: ${total}`);
}

readInput();
