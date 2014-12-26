rm tests/data/db.db
node scripts/initializeDB.js tests/data/db.db
sqlite3 tests/data/db.db < scripts/queries.sql

rm tests/data/db.db.backup
node scripts/initializeDB.js tests/data/db.db.backup
sqlite3 tests/data/db.db.backup < scripts/queries.sql