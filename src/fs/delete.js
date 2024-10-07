import fs from 'fs/promises';
import path from 'path';

const remove = async () => {
    const filePath = path.join(import.meta.dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.access(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed: file does not exist');
        }
        throw err;
    }

    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        throw new Error('FS operation failed during file removal');
    }
};

await remove().catch((err) => console.error(err.message));
