import fs from 'fs/promises';
import path from 'path';

const rename = async () => {
    const wrongFilePath = path.join(import.meta.dirname, 'files', 'wrongFilename.txt');
    const properFilePath = path.join(import.meta.dirname, 'files', 'properFilename.md');

    try {
        await fs.access(wrongFilePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed: wrongFilename.txt does not exist');
        }
        throw err;
    }

    try {
        await fs.access(properFilePath);
        throw new Error('FS operation failed: properFilename.md already exists');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    try {
        await fs.rename(wrongFilePath, properFilePath);
        console.log('File renamed successfully');
    } catch (err) {
        throw new Error('FS operation failed during renaming');
    }
};

await rename().catch((err) => console.error(err.message));
