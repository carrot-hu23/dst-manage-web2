import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const version = pkg.version;

if (!version) {
  throw new Error('package.json version is required');
}

writeFileSync(
  resolve(root, 'public/misc/config.json'),
  `${JSON.stringify({ version, github: 'https://github.com/hujinbo23/dst-admin-go' }, null, 2)}\n`,
);

writeFileSync(resolve(root, 'public/version.txt'), `${version}\n`);

console.log(`synced frontend version ${version}`);
