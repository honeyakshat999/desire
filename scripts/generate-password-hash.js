// Script to generate password hash for admin login
// Run with: node scripts/generate-password-hash.js YOUR_PASSWORD

import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.log('Usage: node scripts/generate-password-hash.js YOUR_PASSWORD');
  console.log('');
  console.log('Example: node scripts/generate-password-hash.js mySecurePassword123');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log('');
console.log('=== Password Hash Generated ===');
console.log('');
console.log('Add these to your Netlify Environment Variables:');
console.log('');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('');
console.log('Also make sure you have these environment variables set:');
console.log('- ADMIN_EMAIL=your-email@example.com');
console.log('- JWT_SECRET=your-random-secret-key-at-least-32-chars');
console.log('- DATABASE_URL=your-neon-database-connection-string');
console.log('');
