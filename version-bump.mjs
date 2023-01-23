import { readFileSync, writeFileSync } from 'fs';

const readJSON = (filename) =>
    JSON.parse(readFileSync(filename, 'utf8'));

const writeJSON = (filename, obj) => {
    writeFileSync(filename, JSON.stringify(obj, null, '\t'));
};

const targetVersion = process.env.npm_package_version;

const manifest = readJSON('manifest.json');
writeJSON('manifest.json', { ...manifest, version: targetVersion });

const versions = readJSON('versions.json');
writeJSON('versions.json', { ...versions, [targetVersion]: manifest.minAppVersion });
