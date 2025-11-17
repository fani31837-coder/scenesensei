#!/usr/bin/env node

/**
 * Deploy SceneSensei to Vercel using REST API
 * Usage: node scripts/deploy-vercel.mjs <VERCEL_TOKEN> [PROJECT_NAME]
 * 
 * Example: node scripts/deploy-vercel.mjs "YOUR_TOKEN_HERE" scenesensei
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node:fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const token = process.argv[2];
const projectName = process.argv[3] || 'scenesensei';

if (!token) {
  console.error('❌ Error: VERCEL_TOKEN is required');
  console.error('Usage: node scripts/deploy-vercel.mjs <TOKEN> [PROJECT_NAME]');
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  console.error(`❌ Error: ${distDir} not found. Run 'npm run build' first.`);
  process.exit(1);
}

async function uploadFile(filePath, vercelPath) {
  const content = fs.readFileSync(filePath);
  const formData = new FormData();
  formData.append('file', new Blob([content]), path.basename(filePath));

  const response = await fetch(
    `https://api.vercel.com/v12/deployments/${deploymentId}/files?name=${encodeURIComponent(vercelPath)}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to upload ${filePath}: ${response.statusText}`);
  }
}

async function deploy() {
  try {
    console.log('🚀 Deploying SceneSensei to Vercel...\n');

    // Step 1: Create deployment
    console.log('📦 Creating deployment...');
    const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: projectName,
        project: projectName,
        public: true,
      }),
    });

    if (!deployRes.ok) {
      const error = await deployRes.text();
      throw new Error(`Deployment creation failed: ${deployRes.status} ${error}`);
    }

    const deployment = await deployRes.json();
    const deploymentId = deployment.id;
    console.log(`✅ Deployment created: ${deploymentId}\n`);

    // Step 2: Upload files
    console.log('📤 Uploading files...');
    const files = getAllFiles(distDir);
    for (const file of files) {
      const relativePath = path.relative(distDir, file);
      const vercelPath = relativePath.replace(/\\/g, '/');
      console.log(`  → ${vercelPath}`);
      await uploadFile(file, vercelPath);
    }
    console.log(`✅ Uploaded ${files.length} files\n`);

    // Step 3: Finalize deployment
    console.log('🎯 Finalizing deployment...');
    const finalizeRes = await fetch(
      `https://api.vercel.com/v13/deployments/${deploymentId}/finalize`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!finalizeRes.ok) {
      throw new Error(`Finalization failed: ${finalizeRes.status}`);
    }

    const finalDeployment = await finalizeRes.json();
    const deploymentUrl = `https://${finalDeployment.url}`;

    console.log('✅ Deployment finalized!\n');
    console.log(`🎉 Your site is live at: ${deploymentUrl}`);
    console.log(`📊 Deployment ID: ${deploymentId}\n`);

    return 0;
  } catch (err) {
    console.error('❌ Deployment failed:', err.message);
    return 1;
  }
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

process.exit(await deploy());
