import { readFileSync, writeFileSync } from 'fs';

const readJSON = (filename) =>
    JSON.parse(readFileSync(filename, 'utf8'));

const writeJSON = (filename, obj) => {
    writeFileSync(filename, JSON.stringify(obj, null, '\t'));
};

const manifest = readJSON('manifest.json');

const versions = readJSON('versions.json');
writeJSON('versions.json', { ...versions, [manifest.version]: manifest.minAppVersion });
