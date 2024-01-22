import { QuickUnionUF } from "./quickuf";

export class Percolation {
  public grid: boolean[];
  private size: number;
  private openSites: number;
  private uf: QuickUnionUF;

  constructor(n: number) {
    if (n <= 0) {
      throw new Error('n must be greater than 0');
    }
    this.size = n;
    this.openSites = 0;
    this.grid = new Array(n * n).fill(false);
    this.uf = new QuickUnionUF(n * n + 2);

    for (let i = 0; i < n; i++) {
      this.uf.union(this.getIndex(0, i), n * n); //connects to a virtual root at the top
      this.uf.union(this.getIndex(n - 1, i), n * n + 1); //connects to a virtual root at the bottom
    }
  }

  open(row: number, col: number) {
    const index = this.getIndex(row, col);
    // console.log(row,col,'index is',index)

    if (!this.grid[index]) { // if the grid is still false
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
    }
  }

  isOpen(row: number, col: number): boolean {
    return this.grid[this.getIndex(row, col)];
  }

  isFull(row: number, col: number): boolean {
    // console.log(this.getIndex(row, col), this.size * this.size, 'testings full')
    return this.uf.connected(this.getIndex(row, col), this.size * this.size);
  }

  numberOfOpenSites(): number {
    return this.openSites;
  }

  percolates(): boolean {
    let n = this.size;
    // note that n*n is the virtual top
    // and n*n+1 is the virtual bottom
    // this checks if both are connected
    if (this.uf.connected(n * n, n * n + 1)) {
      return true; 
    }
    return false;
  }

  private getIndex(row: number, col: number): number {
    return row * this.size + col;
  }

  private isValid(row: number, col: number): boolean {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }
}
