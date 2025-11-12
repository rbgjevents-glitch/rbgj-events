# How to Create .env File - Step by Step

## Method 1: Using Notepad (Easiest)

1. **Open Notepad:**
   - Press `Windows Key + R`
   - Type: `notepad`
   - Press Enter

2. **Type this content:**
   ```
   ADMIN_PASSWORD=YourPassword123
   SESSION_SECRET=random-secret-key-change-this
   PORT=3000
   ```

3. **Save the file:**
   - Click "File" → "Save As"
   - Navigate to: `C:\Users\Ashwin\Desktop\college-events-app\`
   - In "File name" field, type: `.env` (with the dot!)
   - In "Save as type", select: **"All Files (*.*)"**
   - Click "Save"

**Important:** Make sure the file is saved as `.env` (not `.env.txt`)

---

## Method 2: Using PowerShell (After Opening PowerShell in Project)

1. **Open PowerShell in your project** (see main instructions)

2. **Create the file:**
   ```powershell
   @"
   ADMIN_PASSWORD=YourPassword123
   SESSION_SECRET=random-secret-key-change-this
   PORT=3000
   "@ | Out-File -FilePath .env -Encoding utf8
   ```

3. **Verify it was created:**
   ```powershell
   dir .env
   ```

---

## Method 3: Using Command Prompt

1. Open Command Prompt in your project folder
2. Type:
   ```cmd
   echo ADMIN_PASSWORD=YourPassword123 > .env
   echo SESSION_SECRET=random-secret-key-change-this >> .env
   echo PORT=3000 >> .env
   ```

---

## Verify the File

After creating, check:
- File should be in: `C:\Users\Ashwin\Desktop\college-events-app\.env`
- File should be named exactly `.env` (not `.env.txt`)
- You can verify by typing `dir` in PowerShell - you should see `.env` in the list

---

## What to Put in .env

Replace these values:

- **ADMIN_PASSWORD:** Your admin login password (choose something secure)
- **SESSION_SECRET:** A random string (get one from: https://randomkeygen.com/)
- **PORT:** Leave as `3000` (default)

Example:
```
ADMIN_PASSWORD=MySecurePass123!
SESSION_SECRET=a8f5f167f44f4964e6c998dee827110c
PORT=3000
```

