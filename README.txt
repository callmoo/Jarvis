J.A.R.V.I.S. — macOS App
══════════════════════════════════════════

HOW TO GET YOUR .DMG (no Node, no Terminal)
─────────────────────────────────────────────

1. CREATE A GITHUB REPO
   • Go to github.com → sign in → click "+" → "New repository"
   • Name it: jarvis  (private is fine)
   • Do NOT tick "Add README" — leave it empty
   • Click "Create repository"

2. UPLOAD THESE FILES
   • On the repo page click "uploading an existing file"
   • Drag in everything from this folder EXCEPT the build/ folder
     (i.e. drag: main.js, index.html, preload.js, package.json,
      .gitignore, and the .github folder)
   • Scroll down, click "Commit changes"

3. WATCH IT BUILD
   • Click the "Actions" tab at the top of your repo
   • You'll see "Build JARVIS macOS App" running
   • It takes about 3–4 minutes

4. DOWNLOAD YOUR .DMG
   • Click the completed workflow run
   • Scroll down to "Artifacts"
   • Click "JARVIS-macOS" to download a zip
   • Unzip it — inside is your .dmg

5. INSTALL
   • Open the .dmg
   • Drag JARVIS to Applications
   • Launch it from Launchpad or Spotlight

   First launch only:
   • macOS may say "unidentified developer"
     → Right-click JARVIS → Open → Open anyway
   • Allow microphone access when prompted
   • Enter your API keys in the header and click SAVE

EVERY TIME YOU WANT TO UPDATE
───────────────────────────────
Just upload the changed index.html to GitHub again.
Actions rebuilds automatically and a new .dmg appears.

══════════════════════════════════════════
