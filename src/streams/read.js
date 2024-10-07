import { createReadStream } from 'fs';
import path from 'path';

const read = async () => {
    const filePath = path.join(import.meta.dirname, 'files', 'fileToRead.txt'); // Указываем путь к файлу

    const fileStream = createReadStream(filePath, 'utf-8');

    fileStream.pipe(process.stdout);

    fileStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });
};

await read();
