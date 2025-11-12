# How to Access the App on Your Mobile Phone

## Step 1: Find Your Computer's IP Address

### On Windows:
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" - it will look like: `192.168.1.100` or `10.0.0.5`
4. **Write down this number!**

## Step 2: Start Your Server

1. Open Command Prompt
2. Go to your project:
   ```
   cd %USERPROFILE%\Desktop\college-events-app
   ```
3. Start the server:
   ```
   npm start
   ```
4. **The server will show your IP address automatically!**
   Look for a line like: `🌐 Network: http://192.168.1.100:3000`

## Step 3: Connect Your Phone

1. **Make sure your phone and computer are on the SAME Wi-Fi network**
2. On your phone, open a browser (Chrome or Safari)
3. Type this URL (replace with YOUR IP from Step 1):
   ```
   http://YOUR-IP-ADDRESS:3000/login
   ```
   
   Example: `http://192.168.1.100:3000/login`

## Step 4: Install as App (After Login)

### Android:
- Tap menu (3 dots) → "Add to Home screen" or "Install app"

### iPhone:
- Tap Share button → "Add to Home Screen"

## Troubleshooting:

### "Can't connect" or "Site can't be reached"
- ✅ Check both devices are on same Wi-Fi
- ✅ Check server is running (`npm start`)
- ✅ Check Windows Firewall (see below)

### "Connection refused"
- Allow Windows Firewall:
  1. When `npm start` runs, Windows may ask to allow access - click "Allow"
  2. Or manually: Windows Firewall → Inbound Rules → New Rule → Port 3000 → Allow

### Still not working?
- Try temporarily disabling Windows Firewall to test
- Make sure no antivirus is blocking port 3000


