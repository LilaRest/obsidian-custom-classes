import { readFileSync, writeFileSync } from "fs";

let packageJSON = JSON.parse(readFileSync("package.json", "utf8"));

// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = packageJSON.version;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[packageJSON.version] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));