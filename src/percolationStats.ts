import { Percolation } from './percolation';

export class PercolationStats {
  private thresholds: number[];
  private trials: number;
  private size: number;
  private simulation: boolean;

  constructor(n: number, trials: number, simulation: boolean) {
    if (n <= 0 || trials <= 0) {
      throw new Error('grid size or trials must be greater than 0');
    }
    this.trials = trials;
    this.thresholds = [];
    this.size = n;
    this.simulation = simulation;
  }

  async initialize(): Promise<void> {
    const n = this.size;

    if (this.simulation) {
      // SIMULATION MODE
      for (let i = 0; i < this.trials; i++) {
        const percolation = new Percolation(n, this.simulation);

        console.log('--------------');
        console.log(`Trial ${i + 1} out of ${this.trials}`);
        console.log(percolation.showGrid());

        while (!percolation.percolates()) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              let row: number;
              let col: number;
              do {
                row = Math.floor(Math.random() * n);
                col = Math.floor(Math.random() * n);
              } while (percolation.isOpen(row, col));
              // if site is already opened, it would generate a new row and col

              percolation.open(row, col);

              console.log(`Trial ${i + 1} out of ${this.trials}`);
              console.log(`Opened row ${row}, column ${col}`);
              console.log(percolation.showGrid());
              resolve();
            }, 500);
          });
        }
        console.log("Percolated!");
        const threshold = percolation.numberOfOpenSites() / (n * n);
        this.thresholds.push(threshold);
      }
    } else {
      // NORMAL MODE
      for (let i = 0; i < this.trials; i++) {
        const percolation = new Percolation(n, this.simulation);

        while (!percolation.percolates()) {
          let row: number;
          let col: number;
          do {
            row = Math.floor(Math.random() * n);
            col = Math.floor(Math.random() * n);
          } while (percolation.isOpen(row, col));
          // if site is already opened, it would generate a new row and col

          percolation.open(row, col);
        }
        const threshold = percolation.numberOfOpenSites() / (n * n);
        this.thresholds.push(threshold);
      }
    }
  }

  mean(): number {
    return this.thresholds.reduce((acc, val) => acc + val, 0) / this.trials;
  }

  stddev(): number {
    if (this.trials < 2) {
      return 0;
    };

    const mean = this.mean();
    const variance = this.thresholds.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (this.trials - 1);
    return Math.sqrt(variance);
  }

  confidenceLo(): number {
    return this.mean() - (1.96 * this.stddev()) / Math.sqrt(this.trials);
  }

  confidenceHi(): number {
    return this.mean() + (1.96 * this.stddev()) / Math.sqrt(this.trials);
  }
}