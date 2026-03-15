# SRC LMS Demo Deployment Guide (GitHub Pages)

This guide provides step-by-step instructions on how to host your **SRC LMS Static Demo** on GitHub Pages for free.

## Prerequisites
- A [GitHub account](https://github.com/).
- The `src_labFinal` folder (containing the static HTML files).

---

## Step 1: Create a New GitHub Repository
1. Log in to your GitHub account.
2. Click the **+** (plus) icon in the top-right corner and select **New repository**.
3. Name your repository (e.g., `src-lms-demo`).
4. Set it to **Public**.
5. Do NOT initialize with a README (keep it empty for now).
6. Click **Create repository**.

## Step 2: Upload Your Files
*There are two ways to do this. The easiest for a quick demo is the browser upload.*

### Option A: Upload via Browser (Easiest)
1. In your new repository page, look for the link "uploading an existing file".
2. Open your local `src_labFinal` folder.
3. **Select all files and folders** inside `src_labFinal` (index.html, css/, js/, assets/, admin/, etc.).
4. **Drag and drop** them into the GitHub upload area.
5. Wait for the upload to complete.
6. Scroll down, add a commit message (e.g., "Initial demo release"), and click **Commit changes**.

### Option B: Upload via Git Command Line
1. Open terminal inside the `src_labFinal` folder.
2. Run the following commands:
   ```bash
   git init
   git add .
   git commit -m "deploy demo"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/src-lms-demo.git
   git push -u origin main
   ```

## Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab.
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment > Branch**, select `main` (or `master`) and folder `/(root)`.
4. Click **Save**.

## Step 4: Access Your Demo
1. Wait about 1-3 minutes for GitHub to build the site.
2. Refresh the **Settings > Pages** page.
3. You will see a banner saying: *"Your site is live at https://YOUR_USERNAME.github.io/src-lms-demo/"*.
4. Click the link to view your fully functional static demo!

---

## Important Notes
- **Relative Paths**: This demo is built using relative paths (`./css/...`), which ensures it works perfectly on GitHub Pages subfolders.
- **No Backend**: Remember that this is a static simulation. Data won't persist if you refresh after making "changes" in the UI (like saving branding).
- **Updates**: To update the demo, simply upload/push the new files to the same repository.
