import path from 'path';
import fs from 'fs/promises';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    const filePath = path.join(import.meta.dirname, 'files', 'a.json');
    const data = await fs.readFile(filePath, 'utf-8');
    unknownObject = JSON.parse(data);
} else {
    const filePath = path.join(import.meta.dirname, 'files', 'b.json');
    const data = await fs.readFile(filePath, 'utf-8');
    unknownObject = JSON.parse(data);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};
