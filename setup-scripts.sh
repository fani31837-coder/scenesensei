#!/bin/bash
# Set executable permissions on all scripts
# सभी scripts को executable बनाएं

chmod +x scripts/diagnose_env.sh
chmod +x scripts/auto_fix_local.sh
chmod +x scripts/generate_patch_from_errors.py

echo "✅ Scripts are now executable"
ls -la scripts/
