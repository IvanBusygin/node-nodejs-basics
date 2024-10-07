import { createWriteStream } from 'fs';
import path from 'path';

const write = async () => {
    const filePath = path.join(import.meta.dirname, 'files', 'fileToWrite.txt');

    const fileStream = createWriteStream(filePath, 'utf-8');

    process.stdin.pipe(fileStream);

    fileStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });
};

await write();
