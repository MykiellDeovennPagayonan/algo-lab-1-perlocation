import readline from "readline-sync";
import { QuickUnionUF } from "./quickuf";
import { displayMatrix } from "./displayMatrix";
import { openTile } from "./openTile";

console.log("hi!");

let N = readline.questionInt();

let matrix: Array<Array<boolean>> = [];

for (let i = 0; i < N; i++) {
  let array = [];
  for (let j = 0; j < N; j++) {
    array.push(false);
  }
  matrix.push(array);
}

let ans = readline.questionInt();

while (ans !== 0) {
  matrix = openTile(matrix, N)
  displayMatrix(matrix);
  ans = readline.questionInt()
}

