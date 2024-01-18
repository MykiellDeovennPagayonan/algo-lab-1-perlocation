export class Percolation {
  matrix: Array<Array<boolean>>;
  size: number;
  // creates n-by-n grid, with all sites initially blocked
  constructor(n: number) {
    this.matrix = [];
    this.size = n;

    for (let i = 0; i < n; i++) {
      let array = [];
      for (let j = 0; j < n; j++) {
        array.push(false);
      }
      this.matrix.push(array);
    }

    console.log(this.matrix)
  }

  // opens the site (row, col) if it is not open already
  open(row: number, col: number) {
    this.matrix[col][row] = true;
    console.log('opened', col, row)
    console.log(this.matrix)
  }

  // is the site (row, col) open?
  isOpen(row: number, col: number): boolean {
    return this.matrix[col][row];
  }

  // returns the number of open sites
  numberOfOpenSites(): number {
    return this.matrix.reduce((count, row) => {
      return count + row.filter(value => value === true).length;
    }, 0);
  }

  // does the system percolate?
  percolates(): boolean {
    return true
  }
}