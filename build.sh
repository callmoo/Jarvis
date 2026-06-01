#!/bin/bash
set -e

echo ""
echo "  J.A.R.V.I.S. — Build Script"
echo "  ─────────────────────────────"
echo ""

# Check node
if ! command -v node &> /dev/null; then
  echo "  ✗ Node.js not found."
  echo "    Install it with: brew install node"
  echo "    Or download from: https://nodejs.org"
  exit 1
fi
echo "  ✓ Node $(node -v) found"

# Install deps
echo "  → Installing dependencies..."
npm install --silent

# Build
echo "  → Building JARVIS.app..."
echo "     (this takes ~1–2 minutes the first time)"
echo ""
npm run build

echo ""
echo "  ✓ Done! Find your installer in the dist/ folder."
echo "    Open the .dmg, drag JARVIS to Applications, launch it."
echo ""
