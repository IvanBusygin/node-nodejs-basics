import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];

    const pathWorker = path.join(import.meta.dirname, 'worker.js');

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(pathWorker, {
            workerData: { n: 10 + i }
        });

        workers.push(new Promise((resolve) => {
            worker.on('message', (message) => {
                resolve(message);
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        }));
    }

    const workerResults = await Promise.all(workers);
    console.log(workerResults);
};

await performCalculations();
