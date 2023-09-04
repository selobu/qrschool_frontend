// db.js
import Dexie from 'dexie';

export const db = new Dexie('configDatabse');

db.version(1).stores({
  user: '++id, username, qrcode, email, profile, modules',
  config: '++id, theme, languaje',
  auth: '++id, bearerRefresh, bearerKey'
});

db.version(2).stores({
  user: '++id, isauth, username, qrcode, email, profile, modules, bearerRefresh, bearerKey',
  config: '++id, theme, languaje',
});