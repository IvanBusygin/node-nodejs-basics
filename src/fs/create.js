import fs from 'fs/promises';
import path from 'path';

const create = async () => {
    try {
        const fileContent = 'I am fresh and young';
        const filePath = path.join(import.meta.dirname, 'files', 'fresh.txt');

        try {
            await fs.access(filePath);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.writeFile(filePath, fileContent, 'utf8');
        console.log('File created successfully');
    } catch (error) {
        console.error(error.message);
    }
}

await create();
