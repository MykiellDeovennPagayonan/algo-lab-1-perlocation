import readline from "readline-sync";
import { QuickUnionUF } from "./quickuf";
import { displayMatrix } from "./displayMatrix";
import { openTile } from "./openTile";
import { Percolation } from "./percolation";

console.log("hi!");

let N = readline.questionInt();

let percolate = new Percolation(N);

let ans = readline.question();

while (ans !== "") {
    let col = parseInt(ans.split(' ')[0])
    let row = parseInt(ans.split(' ')[1])

    if (!percolate.isOpen(col,row)) {
        percolate.open(col,row)
    } else {
        console.log('already opened')
    }

    ans = readline.question()
}


// let matrix: Array<Array<boolean>> = [];

// for (let i = 0; i < N; i++) {
//   let array = [];
//   for (let j = 0; j < N; j++) {
//     array.push(false);
//   }
//   matrix.push(array);
// }

// let ans = readline.questionInt();

// while (ans !== 0) {
//   matrix = openTile(matrix, N)
//   displayMatrix(matrix);
//   ans = readline.questionInt()
// }

