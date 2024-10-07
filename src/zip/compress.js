import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from "path";

const compress = async () => {
    const inputFile = path.join(import.meta.dirname, 'files', 'fileToCompress.txt');
    const outputFile = path.join(import.meta.dirname, 'files', 'archive.gz');

    const gzip = createGzip();
    const inputStream = createReadStream(inputFile, 'utf-8');
    const outputStream = createWriteStream(outputFile, 'utf-8');

    inputStream.pipe(gzip).pipe(outputStream);

    outputStream.on('finish', () => {
        console.log(`File ${inputFile} has been compressed to ${outputFile}`);
    });

    outputStream.on('error', (err) => {
        console.error('An error occurred:', err);
    });
}

await compress();
