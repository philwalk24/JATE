import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add data to the IndexedDB database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    // Open the 'jate' database with version 1
    const jateDb = await openDB('jate', 1);
    // Start a read-write transaction
    const tx = jateDb.transaction('jate', 'readwrite');
    // Get the 'jate' object store
    const storage = tx.objectStore('jate');
    // Put the content into the object store with an auto-incrementing key
    const request = storage.put({ value: content });
    // Wait for the request to complete
    const result = await request;
    console.log('🚀 - data saved to the database', result.value);
  } catch (error) {
    console.error('Error storing data in the database:', error);
  }
};

// Method to retrieve data from the IndexedDB database
export const getDb = async () => {
  try {
    console.log('GET from the database');
    // Open the 'jate' database with version 1
    const jateDb = await openDB('jate', 1);
    // Start a read-only transaction
    const tx = jateDb.transaction('jate', 'readonly');
    // Get the 'jate' object store
    const storage = tx.objectStore('jate');
    // Get the data with key 1 from the object store
    const request = storage.get(1);
    // Wait for the request to complete
    const result = await request;
    // Check if data was found and log the result
    result
      ? console.log('🚀 - data retrieved from the database', result.value)
      : console.log('🚀 - data not found in the database');
    // Use optional chaining to safely access the result value and return it
    return result?.value;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    return null;
  }
};

// Initialize the database when the script is loaded
initdb();