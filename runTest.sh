rm -rf tests/data/instance.db
node scripts/initializeDB.js tests/data/instance.db 
sqlite3 tests/data/instance.db < scripts/queries.sql

rm -rf tests/data/instance.db.backup
node scripts/initializeDB.js tests/data/instance.db.backup 
sqlite3 tests/data/instance.db.backup < scripts/queries.sql

mocha tests