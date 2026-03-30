// migration-to-db.js
// This script migrates the existing in-memory transaction and debt data from FinioOS index.html to IndexedDB.

// Open (or create) the IndexedDB database
let db;
const request = indexedDB.open('FinioOSDB', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    // Create object stores for transactions and debts
    const transactionStore = db.createObjectStore('transactions', { keyPath: 'id' });
    const debtStore = db.createObjectStore('debts', { keyPath: 'id' });
};

request.onsuccess = function(event) {
    db = event.target.result;
    migrateData();
};

request.onerror = function(event) {
    console.error('Database error: ', event.target.error);
};

function migrateData() {
    // Sample existing in-memory data (replace with actual data retrieval logic)
    const inMemoryTransactions = [ /* Populate with existing transaction data */ ];
    const inMemoryDebts = [ /* Populate with existing debt data */ ];

    const transactionTransaction = db.transaction(['transactions', 'debts'], 'readwrite');
    const transactionObjStore = transactionTransaction.objectStore('transactions');
    const debtObjStore = transactionTransaction.objectStore('debts');

    // Migrate transactions
    inMemoryTransactions.forEach(transaction => {
        transactionObjStore.add(transaction);
    });

    // Migrate debts
    inMemoryDebts.forEach(debt => {
        debtObjStore.add(debt);
    });

    transactionTransaction.onsuccess = function() {
        console.log('Data migration complete!');
    };

    transactionTransaction.onerror = function(event) {
        console.error('Error during data migration: ', event.target.error);
    };
}