import Database from 'better-sqlite3';
import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../devotionals.db');

const isDbCreated = existsSync(dbPath);
const db: any = new Database(dbPath);
export default db;

if (!isDbCreated) {
db.exec(`
    CREATE TABLE IF NOT EXISTS devotionals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        verse TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULLL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT NULL,
        deleted_at TEXT DEFAULT_NULL
    );
`);
console.log("Database and alll tables created successfully")
}


