/* Day 5: Print Queue Part 2

For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order.

What do you get if you add up the middle page numbers after correctly ordering just those updates?

*/

import { readAll } from "jsr:@std/io/read-all";


async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const [rulesText, pageListsText] = text.split("\n\n");

  let total = 0;

  // Parse the rules
  const rulePairs = rulesText.split("\n").map((line) => line.split("|").map((value) => Number(value)));
  const rules = new Map<number, Set<number>>();

  for (const [first, second] of rulePairs) {
    if (rules.has(first)) {
      rules.get(first)!.add(second);
    } else {
      rules.set(first, new Set([second]));
    }
  }
  
  // Parse the page lists
  const pageLists = pageListsText.split("\n").map((line) => line.split(",").map((value) => Number(value)));
  
  for (const pageList of pageLists) {
    const seenPages = new Set<number>();
    let corrected: number[] | null = null;

    // finding first, has second been seen already? -> fix
    for (const value of pageList) {
      pageList.with
      if (rules.has(value)) {
        const seenAndRuleBreaking = rules.get(value)!.intersection(seenPages);
        if (seenAndRuleBreaking.size > 0) {
          if (corrected === null) {
            corrected = [...pageList];
          }
          // now correct
          const incorrectPageNumberIndex = corrected.indexOf(value);
          const firstConflictingPageNumberIndex = 
            Math.min(
              ...seenAndRuleBreaking.values().map(seenPageNumber => corrected!.indexOf(seenPageNumber)));
          const deleteCount = incorrectPageNumberIndex - firstConflictingPageNumberIndex + 1;
          const replacement = [value, ...corrected.slice(firstConflictingPageNumberIndex, incorrectPageNumberIndex)];
          corrected.splice(firstConflictingPageNumberIndex, deleteCount, ...replacement);
        }
      }
      seenPages.add(value)
    }

    if (corrected !== null) {
      const middleIndex = Math.floor(corrected.length / 2);
      total += corrected[middleIndex];
    }
  }

  console.log(`Total: ${total}`);
}

readInput();
