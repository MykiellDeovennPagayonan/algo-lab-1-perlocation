import { Percolation } from './percolation';

export class PercolationStats {
  private thresholds: number[];
  private trials: number;

  constructor(n: number, trials: number) {
    if (n <= 0 || trials <= 0) {
      throw new Error('n and trials must be greater than 0');
    }
    this.trials = trials;
    this.thresholds = [];

    for (let i = 0; i < trials; i++) {
      const percolation = new Percolation(n);
      while (!percolation.percolates()) {
        const row = Math.floor(Math.random() * n);
        const col = Math.floor(Math.random() * n);
        percolation.open(row, col);
      }
      // console.log(percolation.grid, percolation.numberOfOpenSites())
      const threshold = percolation.numberOfOpenSites() / (n * n);
      // console.log(threshold)
      this.thresholds.push(threshold);
    }
  }

  mean(): number {
    // console.log(this.thresholds)
    return this.thresholds.reduce((acc, val) => acc + val, 0) / this.trials;
  }

  stddev(): number {
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