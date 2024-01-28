import { Percolation } from './percolation';

export class PercolationStats {
  private thresholds: number[];
  private trials: number;

  constructor(n: number, trials: number, simulation: string) {
    if (n <= 0 || trials <= 0) {
      throw new Error('n and trials must be greater than 0');
    }
    this.trials = trials;
    this.thresholds = [];
    if (simulation === "y" || simulation === "yes") {
      this.runSimulation(n, trials);
    } else {
      this.runTrials(n, trials);
    }
  }

  private async runSimulation(n: number, trials: number) {
    for (let i = 0; i < trials; i++) {
      const percolation = new Percolation(n);
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
            console.log(`Trial ${i + 1}`)
            console.log(`Opened row ${row}, column ${col}`)
            console.log(percolation.showGrid());
            resolve();
          }, 1000);
        });
      }
      console.log("Percolated!\n--------------");
      const threshold = percolation.numberOfOpenSites() / (n * n);
      this.thresholds.push(threshold);
    }
    console.log(`Mean: ${this.mean()}`);
    console.log(`Standard Deviation: ${this.stddev()}`);
    console.log(`95% Confidence Interval: [${this.confidenceLo()}, ${this.confidenceHi()}]`);
  }

  private runTrials(n: number, trials: number) {
    console.time("Execution Time");
    for (let i = 0; i < trials; i++) {
      const percolation = new Percolation(n);
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
    console.log('--------------');
    console.timeEnd("Execution Time");
    console.log(`Mean: ${this.mean()}`);
    console.log(`Standard Deviation: ${this.stddev()}`);
    console.log(`95% Confidence Interval: [${this.confidenceLo()}, ${this.confidenceHi()}]`);
  }

  private mean(): number {
    return this.thresholds.reduce((acc, val) => acc + val, 0) / this.trials;
  }

  private stddev(): number {
    if (this.trials < 2) {
      return 0;
    };

    const mean = this.mean();
    const variance = this.thresholds.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (this.trials - 1);
    return Math.sqrt(variance);
  }

  private confidenceLo(): number {
    return this.mean() - (1.96 * this.stddev()) / Math.sqrt(this.trials);
  }

  private confidenceHi(): number {
    return this.mean() + (1.96 * this.stddev()) / Math.sqrt(this.trials);
  }
}