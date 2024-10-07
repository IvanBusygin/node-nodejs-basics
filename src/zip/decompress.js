import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from "path";

const decompress = async () => {
    const inputFile = path.join(import.meta.dirname, 'files', 'archive.gz');
    const outputFile = path.join(import.meta.dirname, 'files', 'fileToCompress.txt');

    const gunzip = createGunzip();
    const inputStream = createReadStream(inputFile);
    const outputStream = createWriteStream(outputFile);

    inputStream.pipe(gunzip).pipe(outputStream);

    outputStream.on('finish', () => {
        console.log(`File ${inputFile} has been decompressed to ${outputFile}`);
    });

    outputStream.on('error', (err) => {
        console.error('An error occurred:', err);
    });
};

await decompress();
