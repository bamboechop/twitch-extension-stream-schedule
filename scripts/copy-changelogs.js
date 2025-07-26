import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '..');
const publicDir = resolve(rootDir, 'public');

// Ensure public directory exists
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const srcPath = resolve(rootDir, 'CHANGELOG.md');
const destPath = resolve(publicDir, 'CHANGELOG.md');

if (existsSync(srcPath)) {
  copyFileSync(srcPath, destPath);
  console.info('✓ Copied CHANGELOG.md to public folder');
} else {
  console.warn('⚠ Warning: CHANGELOG.md not found in root directory');
}

console.info('Changelog files ready!');
