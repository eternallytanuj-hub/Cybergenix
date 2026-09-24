import { startMockServer } from './helpers/mock_server.js';
import { spawn } from 'node:child_process';
import path from 'node:path';

async function verify() {
  console.log('Starting verification server on port 5199...');
  const server = await startMockServer(5199);

  console.log('Running test_runner.js against verification server...');
  const runner = spawn('node', ['tests/test_runner.js', '--url=http://localhost:5199', '--strict'], {
    stdio: 'inherit',
    cwd: path.resolve(process.cwd()),
  });

  runner.on('close', (code) => {
    console.log(`\nTest runner finished with exit code: ${code}`);
    server.close(() => {
      console.log('Verification server closed.');
      process.exit(code);
    });
  });
}

verify();
