# How to Find Your IP Address and Connect from Mobile

## Step 1: Find Your Computer's IP Address

### Method 1 - Using Command Prompt:
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your active network adapter (usually "Wireless LAN adapter Wi-Fi" or "Ethernet adapter")
4. It will look like: `192.168.1.100` or `10.0.0.5`

### Method 2 - Using Settings:
1. Press Win + I (Settings)
2. Go to Network & Internet → Wi-Fi (or Ethernet)
3. Click on your network connection
4. Scroll down to find "IPv4 address"

## Step 2: Make Sure Server is Running

1. Open Command Prompt
2. Go to your project folder:
   ```
   cd %USERPROFILE%\Desktop\college-events-app
   ```
3. Start the server:
   ```
   npm start
   ```
4. You should see: "Server running on http://localhost:3000"

## Step 3: Allow Firewall Access

Windows Firewall might be blocking the connection. To allow it:

1. Press Win + R, type `wf.msc`, press Enter
2. Click "Inbound Rules" → "New Rule"
3. Select "Port" → Next
4. Select "TCP" and enter port "3000" → Next
5. Select "Allow the connection" → Next
6. Check all profiles → Next
7. Name it "Node.js Server" → Finish

OR use this quick method:
1. When you run `npm start`, Windows might show a popup asking to allow access
2. Click "Allow access"

## Step 4: Connect from Your Phone

1. Make sure your phone and computer are on the SAME Wi-Fi network
2. On your phone's browser, type:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   Replace YOUR-IP-ADDRESS with the IP you found in Step 1
   
   Example: `http://192.168.1.100:3000`

## Troubleshooting:

- **Can't connect?** Make sure both devices are on the same Wi-Fi
- **Connection refused?** Check Windows Firewall settings
- **Still not working?** Try temporarily disabling Windows Firewall to test
- **Server not running?** Make sure `npm start` is running in Command Prompt


