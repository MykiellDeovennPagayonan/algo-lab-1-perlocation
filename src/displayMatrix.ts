export function displayMatrix(matrix : Array<Array<boolean>>) {
  for (let i = 0; i < matrix.length; i++) {
    let line = ""
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        line += "[ ]"
      } else {
        line += "[x]"
      }
    }

    console.log(line)
  }
}