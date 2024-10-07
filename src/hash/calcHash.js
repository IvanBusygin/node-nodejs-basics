import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

const calculateHash = async () => {
    const filePath = path.join(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');

    const fileStream = createReadStream(filePath);

    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        const hashValue = hash.digest('hex');
        console.log(`SHA256 hash: ${hashValue}`);
    });

    fileStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });
};

await calculateHash();
