/**
 * Build script to replace environment variables in static files
 * Run this after build: node scripts/post-build.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.ozonio.site';

// Update robots.txt
const robotsPath = join(__dirname, '../dist/robots.txt');
try {
  let robotsContent = readFileSync(robotsPath, 'utf-8');
  
  // Replace sitemap URL
  robotsContent = robotsContent.replace(
    /Sitemap: https:\/\/[^\s]+\/sitemap\.xml/g,
    `Sitemap: ${SITE_URL}/sitemap.xml`
  );
  
  writeFileSync(robotsPath, robotsContent, 'utf-8');
  console.log('✅ robots.txt updated with SITE_URL:', SITE_URL);
} catch (error) {
  console.warn('⚠️ Could not update robots.txt:', error.message);
}
