import { spawn } from 'child_process';
import path from "path";

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(import.meta.dirname, 'files', 'script.js');

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
    });
}

await spawnChildProcess(['arg1', 'arg2', 'arg3', 'arg4', 'arg5']);
