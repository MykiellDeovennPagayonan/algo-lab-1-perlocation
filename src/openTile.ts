export function openTile(matrix : Array<Array<boolean>>, size : number) : Array<Array<boolean>> {
  let x = Math.trunc(Math.random() * size)
  let y = Math.trunc(Math.random() * size)

  if (matrix[x][y]) {
    return openTile(matrix, size)
  } else {
    matrix[x][y] = true
    return matrix
  }
}