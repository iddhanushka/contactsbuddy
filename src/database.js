import SQLite from 'react-native-sqlite-storage';

const databaseName = 'contactsbuddy.db';
const databaseVersion = '2.0';
const databaseDisplayname = 'Contacts Buddy';
// const databaseSize = 200000;

const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayname,
  // databaseSize,
  () => {},
  error => {
    console.error('Error opening database: ', error);
  },
);

export default db;
