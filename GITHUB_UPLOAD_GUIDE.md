# Upload K Aura Salon to GitHub

## Recommended: upload with Git from VS Code

1. Create an empty private repository on GitHub named `k-aura-salon`.
2. Do not add a README, `.gitignore`, or license on GitHub because this package already contains those project files.
3. Extract this project ZIP to a permanent location on your computer.
4. Open the extracted `k-aura-salon-source` folder in Visual Studio Code.
5. Open **Terminal > New Terminal**.
6. Initialize Git and create the first local commit:

   ```bash
   git init
   git add .
   git commit -m "Initial K Aura Salon source"
   git branch -M main
   ```

7. Connect the folder to the URL of your new private GitHub repository:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/k-aura-salon.git
   git push -u origin main
   ```

8. Refresh the GitHub repository and confirm that the project files appear.

## Before every push

Run:

```bash
npm run build
```

Then review the Source Control panel in VS Code. Confirm that no `.env`, `.dev.vars`, API keys, credentials, subscriber exports, or uploaded identification documents are listed.

## Normal update workflow

Create a branch for each focused change:

```bash
git switch -c fix/short-description
```

After making and testing the change:

```bash
git add .
git commit -m "Describe the completed change"
git push -u origin fix/short-description
```

This keeps the working `main` branch protected while flip-card, booking, newsletter, and design improvements are tested.
