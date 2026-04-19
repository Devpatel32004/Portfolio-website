/**
 * Smart Dev Server - Handles port conflicts automatically
 * Prevents orphaned Next.js processes from blocking port 3000
 */

const { spawn, exec } = require('child_process');
const net = require('net');

const DEFAULT_PORT = 3000;
const MAX_PORT_ATTEMPTS = 5;

// Check if port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}

// Find process using port and kill it
function killProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    // Windows command to find and kill process by port
    const findCommand = `netstat -ano | findstr :${port}`;

    exec(findCommand, (error, stdout) => {
      if (error || !stdout) {
        resolve(); // No process found
        return;
      }

      // Parse PID from netstat output
      const lines = stdout.trim().split('\n');
      const pids = new Set();

      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(parseInt(pid))) {
          pids.add(pid);
        }
      });

      if (pids.size === 0) {
        resolve();
        return;
      }

      console.log(`Found processes on port ${port}: ${Array.from(pids).join(', ')}`);

      // Kill each process
      let killedCount = 0;
      const totalPids = pids.size;

      pids.forEach(pid => {
        exec(`taskkill /PID ${pid} /F 2>nul`, (killError) => {
          killedCount++;
          if (!killError) {
            console.log(`✓ Killed process ${pid}`);
          }

          if (killedCount === totalPids) {
            // Wait a moment for port to be released
            setTimeout(() => resolve(), 500);
          }
        });
      });
    });
  });
}

// Start Next.js dev server
function startDevServer(port) {
  console.log(`\n🚀 Starting Next.js dev server on port ${port}...\n`);

  const nextDev = spawn('npx', ['next', 'dev', '--port', port.toString()], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'development' }
  });

  // Handle graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    nextDev.kill('SIGTERM');

    // Force kill after 5 seconds if still running
    setTimeout(() => {
      if (nextDev.exitCode === null) {
        nextDev.kill('SIGKILL');
      }
    }, 5000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('exit', () => {
    if (nextDev.exitCode === null) {
      nextDev.kill();
    }
  });

  nextDev.on('error', (err) => {
    console.error('Failed to start dev server:', err);
    process.exit(1);
  });

  nextDev.on('exit', (code) => {
    process.exit(code);
  });
}

// Main function
async function main() {
  let port = DEFAULT_PORT;
  let attempts = 0;

  // Check default port
  if (await isPortInUse(DEFAULT_PORT)) {
    console.log(`⚠ Port ${DEFAULT_PORT} is in use. Cleaning up...`);
    await killProcessOnPort(DEFAULT_PORT);

    // Double-check port is free
    if (await isPortInUse(DEFAULT_PORT)) {
      console.log(`⚠ Port ${DEFAULT_PORT} still occupied. Trying alternative ports...`);

      // Try alternative ports
      while (attempts < MAX_PORT_ATTEMPTS) {
        port = DEFAULT_PORT + attempts + 1;
        if (!(await isPortInUse(port))) {
          console.log(`✓ Found available port: ${port}`);
          break;
        }
        attempts++;
      }

      if (attempts >= MAX_PORT_ATTEMPTS) {
        console.error('❌ Could not find an available port. Please restart your computer.');
        process.exit(1);
      }
    } else {
      console.log(`✓ Port ${DEFAULT_PORT} is now available`);
    }
  }

  startDevServer(port);
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
