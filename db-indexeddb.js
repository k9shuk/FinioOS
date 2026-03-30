// IndexedDB implementation for client-side storage

const dbName = 'MyAppDB';
const dbVersion = 1;
let db;

const openDatabase = () => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        db.createObjectStore('myStore', { keyPath: 'id' });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
    };

    request.onerror = (event) => {
        console.error('Database error: ' + event.target.errorCode);
    };
};

const addItem = (item) => {
    const transaction = db.transaction(['myStore'], 'readwrite');
    const store = transaction.objectStore('myStore');
    store.add(item);
};

const getItem = (id) => {
    const transaction = db.transaction(['myStore'], 'readonly');
    const store = transaction.objectStore('myStore');
    return store.get(id);
};

openDatabase();

export { addItem, getItem };