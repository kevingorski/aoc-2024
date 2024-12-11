/* Day 4: Ceres Search

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words.

It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them.

*/

import { readAll } from "jsr:@std/io/read-all";

const needle = "XMAS";

function findNeedle(getChar: (index: number) => string | undefined) {
  for (let i = 1; i < needle.length; i++) {
    const char = getChar(i);
    if (char !== needle[i]) return false;
  }
  return true;
}

async function readInput() {
  const input = await readAll(Deno.stdin);
  const text = new TextDecoder().decode(input);
  const rows = text.split("\n").map((row) => row.split(""));

  let total = 0;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const char = row[colIndex];

      if (char !== needle[0]) continue;

      // Find forward horizontal
      findNeedle((i) => {
        return colIndex + i < row.length ? row[colIndex + i] : undefined;
      }) && total++;

      // Find backward horizontal
      findNeedle((i) => {
        return (-1 < colIndex - i) ? row[colIndex - i] : undefined;
      }) && total++;

      // Find forward vertical
      findNeedle((i) => {
        return (rowIndex + i < rows.length)
          ? rows[rowIndex + i][colIndex]
          : undefined;
      }) && total++;

      // Find backward vertical
      findNeedle((i) => {
        return (-1 < rowIndex - i) ? rows[rowIndex - i][colIndex] : undefined;
      }) && total++;

      // Right, up diagonal
      findNeedle((i) => {
        return (rowIndex + i < rows.length && colIndex + i < row.length)
          ? rows[rowIndex + i][colIndex + i]
          : undefined;
      }) && total++;

      // Right, down diagonal
      findNeedle((i) => {
        return (rowIndex - i >= 0 && colIndex + i < row.length)
          ? rows[rowIndex - i][colIndex + i]
          : undefined;
      }) && total++;

      // Left, up diagonal
      findNeedle((i) => {
        return (rowIndex + i < rows.length && -1 < colIndex - i)
          ? rows[rowIndex + i][colIndex - i]
          : undefined;
      }) && total++;

      // Left, down diagonal
      findNeedle((i) => {
        return (rowIndex - i >= 0 && -1 < colIndex - i)
          ? rows[rowIndex - i][colIndex - i]
          : undefined;
      }) && total++;
    }
  }

  console.log(`Total: ${total}`);
}

readInput();
