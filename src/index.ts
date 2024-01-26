import * as readlineSync from 'readline-sync';
import { PercolationStats } from './percolationStats';

const n = readlineSync.questionInt('Enter the size of the grid (n): ');
const T = readlineSync.questionInt('Enter the number of trials (T): ');
const speed = readlineSync.question('Simulation Mode (y/n)? ').toLowerCase();

new PercolationStats(n, T, speed);