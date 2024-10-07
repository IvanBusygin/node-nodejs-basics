import fs from 'fs/promises';
import path from 'path';

const copy = async () => {
    const srcFolder = path.join(import.meta.dirname, 'files');
    const destFolder = path.join(import.meta.dirname, 'files_copy');

    try {
        await fs.access(srcFolder);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed: source folder does not exist');
        }
        throw err;
    }

    try {
        await fs.access(destFolder);
        throw new Error('FS operation failed: destination folder already exists');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    const copyRecursive = async (src, dest) => {
        const entries = await fs.readdir(src, { withFileTypes: true });

        await fs.mkdir(dest);

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copyRecursive(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    };

    await copyRecursive(srcFolder, destFolder);
    console.log('Folder copied successfully');
};

copy().catch((err) => console.error(err.message));
