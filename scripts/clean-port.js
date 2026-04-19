/**
 * Clean Port Utility - Manually free port 3000
 * Usage: npm run clean
 */

const { exec } = require('child_process');

const PORT = 3000;

console.log(`Cleaning up port ${PORT}...\n`);

// Windows command to find and kill process by port
const command = `
  for /f "tokens=5" %a in ('netstat -ano ^| findstr :${PORT}') do (
    echo Killing process %a && taskkill /PID %a /F 2>nul
  )
`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log('No processes found on port', PORT);
  } else {
    console.log(stdout || 'Port cleaned successfully');
  }
  console.log('\n✓ Done. You can now run: npm run dev');
});
