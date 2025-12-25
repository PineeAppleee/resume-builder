
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log("🔍 Checking Environment Variables...");

const required = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'MONGODB_URI',
    'OPENROUTER_API_KEY'
];

required.forEach(key => {
    if (process.env[key]) {
        console.log(`✅ ${key} is set.`);
    } else {
        console.error(`❌ ${key} is MISSING.`);
    }
});
