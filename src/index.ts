import * as readlineSync from 'readline-sync';
import { PercolationStats } from './percolationStats';

const n = readlineSync.questionInt('Enter the size of the grid (n): ');
const T = readlineSync.questionInt('Enter the number of trials (T): ');

const percolationStats = new PercolationStats(n, T);

console.log(`Mean: ${percolationStats.mean()}`);
console.log(`Standard Deviation: ${percolationStats.stddev()}`);
console.log(`95% Confidence Interval: [${percolationStats.confidenceLo()}, ${percolationStats.confidenceHi()}]`);