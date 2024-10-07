import fs from 'fs/promises';
import path from 'path';

const read = async () => {
    const filePath = path.join(import.meta.dirname, 'files', 'fileToRead.txt');

    try {
        await fs.access(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed: file does not exist');
        }
        throw err;
    }

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (err) {
        throw new Error('FS operation failed during reading file');
    }
};

await read().catch((err) => console.error(err.message));
