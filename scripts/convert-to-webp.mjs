#!/usr/bin/env node

/**
 * Script para converter imagens JPG/PNG para WebP
 * Economiza ~30-40% do tamanho das imagens mantendo qualidade
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = './src/assets';
const QUALITY = 85; // Qualidade WebP (0-100)
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const savings = ((1 - info.size / (await stat(inputPath)).size) * 100).toFixed(1);
    console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)} (${savings}% menor)`);
    return info;
  } catch (error) {
    console.error(`✗ Erro ao converter ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  const files = await readdir(dir);
  let totalOriginal = 0;
  let totalConverted = 0;
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      continue;
    }
    
    const ext = extname(file).toLowerCase();
    if (!EXTENSIONS.includes(ext)) {
      continue;
    }
    
    const outputPath = filePath.replace(ext, '.webp');
    const info = await convertToWebP(filePath, outputPath);
    
    if (info) {
      totalOriginal += stats.size;
      totalConverted += info.size;
    }
  }
  
  if (totalOriginal > 0) {
    const savings = ((1 - totalConverted / totalOriginal) * 100).toFixed(1);
    const savedKB = ((totalOriginal - totalConverted) / 1024).toFixed(1);
    console.log(`\n📊 Resumo:`);
    console.log(`   Original: ${(totalOriginal / 1024).toFixed(1)} KB`);
    console.log(`   Convertido: ${(totalConverted / 1024).toFixed(1)} KB`);
    console.log(`   Economia: ${savedKB} KB (${savings}%)`);
  }
}

console.log('🖼️  Convertendo imagens para WebP...\n');
processDirectory(ASSETS_DIR)
  .then(() => console.log('\n✅ Conversão concluída!'))
  .catch(err => {
    console.error('❌ Erro:', err);
    process.exit(1);
  });
