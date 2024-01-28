import * as readlineSync from 'readline-sync';
import { PercolationStats } from './percolationStats';

const n = readlineSync.questionInt('Enter the size of the grid (n): ');
const T = readlineSync.questionInt('Enter the number of trials (T): ');
const simulation = readlineSync.question('Simulation Mode (y/n)? ').toLowerCase();

async function handleStart() {
  if (simulation === "y" || simulation === "yes") {
    const percolation = new PercolationStats(n, T, true);
    await percolation.initialize(n, T);

    console.log('--------------');
    console.log(`\u001b[33mMean:\u001b[0m ${percolation.mean()}`);
    console.log(`\u001b[33mStandard Deviation:\u001b[0m ${percolation.stddev()}`);
    console.log(`\u001b[33m95% Confidence Interval:\u001b[0m [${percolation.confidenceLo()}, ${percolation.confidenceHi()}]`);
  } else {
    const percolation = new PercolationStats(n, T, false);
    percolation.initialize(n, T);
    
    console.log('--------------');
    console.timeEnd("\u001b[33mExecution Time\u001b[0m");
    console.log(`\u001b[33mMean:\u001b[0m ${percolation.mean()}`);
    console.log(`\u001b[33mStandard Deviation:\u001b[0m ${percolation.stddev()}`);
    console.log(`\u001b[33m95% Confidence Interval:\u001b[0m [${percolation.confidenceLo()}, ${percolation.confidenceHi()}]`);
  }
}

handleStart();
