import readline from 'readline-sync'
import { QuickUnionUF } from './quickuf'

console.log('hi!')

let N = readline.questionInt()
let uf = new QuickUnionUF(N)
const probability = .5903

for (let i = 0; i < N; i++) {
    let line = ""
    for (let j = 0; j < N; j++) {
        const open = probability > Math.random()
        if (open) {
            line += "[ ]"
        } else {
            line += "[x]"
        }
    }
    console.log(line)
}