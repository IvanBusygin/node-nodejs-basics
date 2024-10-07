import fs from 'fs/promises';
import path from 'path';

const list = async () => {
    const dirPath = path.join(import.meta.dirname, 'files');

    try {
        await fs.access(dirPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed: directory does not exist');
        }
        throw err;
    }

    try {
        const files = await fs.readdir(dirPath);
        console.log('Files in directory:', files);
    } catch (err) {
        throw new Error('FS operation failed during reading directory');
    }
};

await list();
