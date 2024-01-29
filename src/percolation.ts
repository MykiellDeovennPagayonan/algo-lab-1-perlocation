import { QuickUnionUF } from "./quickuf";

export class Percolation {
  private grid: boolean[];
  private size: number;
  private openSites: number;
  private uf: QuickUnionUF;
  private simulation: boolean;

  constructor(n: number, simulation: boolean) {
    if (n <= 0) {
      throw new Error('n must be greater than 0');
    }
    this.size = n;
    this.openSites = 0;
    this.simulation = simulation;
    this.grid = new Array(n * n).fill(false);
    this.uf = new QuickUnionUF(n * n + 2);

    if (!this.simulation) {
      for (let i = 0; i < n; i++) {
        this.uf.union(this.getIndex(0, i), n * n); //connects top row to the virtual top
        this.uf.union(this.getIndex(n - 1, i), n * n + 1); //connects bottom row to the virtual bottom
      }
    }
  }

  open(row: number, col: number) {
    // const [row, col, index] = this.randomizer();
    // console.log(this.randomizer());

    const n = this.size;
    const index = this.getIndex(row, col);

    this.grid[index] = true;
    this.openSites++;

    // up
    if (this.isValid(row - 1, col) && this.isOpen(row - 1, col)) {
      this.uf.union(index, this.getIndex(row - 1, col));
    }

    //down
    if (this.isValid(row + 1, col) && this.isOpen(row + 1, col)) {
      this.uf.union(index, this.getIndex(row + 1, col));
    }

    // left
    if (this.isValid(row, col - 1) && this.isOpen(row, col - 1)) {
      this.uf.union(index, this.getIndex(row, col - 1));
    }

    // right
    if (this.isValid(row, col + 1) && this.isOpen(row, col + 1)) {
      this.uf.union(index, this.getIndex(row, col + 1));
    }

    if (this.simulation) {
      if (row === 0) {
        this.uf.union(this.getIndex(row, col), n * n); //connects top row to the virtual top
      }
      // scans the bottom rows if they are connected to the virtual top, if it is then it connects sa virtual bottom
      for (let i = 0; i < n; i++) {
        if (this.uf.connected(this.getIndex(n - 1, i), n * n)) {
          this.uf.union(this.getIndex(n - 1, i), n * n + 1);
        }
      }
    }
  }

  isOpen(row: number, col: number): boolean {
    return this.grid[this.getIndex(row, col)];
  }

  isFull(row: number, col: number): boolean {
    const n = this.size;
    return this.uf.connected(this.getIndex(row, col), n * n);
  }

  numberOfOpenSites(): number {
    return this.openSites;
  }

  percolates(): boolean {
    const n = this.size;
    // note that n*n is the index of the virtual top
    // and n*n+1 is the index of the virtual bottom
    // this checks if both are connected
    if (this.uf.connected(n * n, n * n + 1)) {
      return true;
    }
    return false;
  }

  showGrid(): string {
    const n = this.size;
    let row = '';

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const index = this.getIndex(i, j);
        if (this.isFull(i, j) && this.grid[index]) {
          row += '[\u001b[36m■\u001b[0m]'; // grid is full
        } else if (this.grid[index]) {
          row += '[ ]'; // grid is opened but indi full
        } else {
          row += '[\u001b[31m■\u001b[0m]'; // grid is blocked
        }
      }
      row += '\n'
    }
    return row;
  }

  private getIndex(row: number, col: number): number {
    return row * this.size + col;
  }

  private isValid(row: number, col: number): boolean {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  // private randomizer(): number[] {
  //   const indices = this.grid.reduce((accumulator: number[], currentValue, currentIndex) => {
  //     if (currentValue === false) accumulator.push(currentIndex);
  //     return accumulator;
  //   }, []);

  //   const index = indices[Math.floor(Math.random() * indices.length)];

  //   const width = Math.sqrt(this.grid.length);

  //   let row = Math.floor(index / width);
  //   let col = index % width;

  //   return [row, col, index];
  // }
}
