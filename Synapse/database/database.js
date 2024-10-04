// const { Platform } = require("react-native");
// import * as SQLite from 'expo-sqlite';

// function openDatabase(){
//     if(Platform.OS === 'web'){
//         return {
//             transaction: () => {
//                 return  {
//                     executeSql: () => {},
//                 }
//             } 
//         }
//     }

//     const db = SQLite.openDatabaseSync("Synapse.db")
//     db.execSync(`
//         PRAGMA journal_mode = WAL;

//             CREATE TABLE IF NOT EXISTS Chat (
//                 id TEXT PRIMARY KEY,
//                 name TEXT NOT NULL,
//                 isGroup INTEGER DEFAULT 0,
//                 createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//                 updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
//             );

//             CREATE TABLE IF NOT EXISTS Membership (
//                 id TEXT PRIMARY KEY,
//                 userId TEXT NOT NULL,
//                 chatId TEXT NOT NULL,
//                 role TEXT NOT NULL,
//                 FOREIGN KEY (userId) REFERENCES User(id),
//                 FOREIGN KEY (chatId) REFERENCES Chat(id),
//                 UNIQUE (userId, chatId)
//             );

//             CREATE TABLE IF NOT EXISTS Message (
//                 id TEXT PRIMARY KEY,
//                 content TEXT,
//                 mediaUrl TEXT,
//                 messageType TEXT NOT NULL,
//                 createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//                 deletedAt DATETIME,
//                 readByAll INTEGER DEFAULT 0,
//                 senderId TEXT NOT NULL,
//                 recipientId TEXT,
//                 chatId TEXT,
//                 replyToId TEXT,
//                 FOREIGN KEY (senderId) REFERENCES User(id),
//                 FOREIGN KEY (recipientId) REFERENCES User(id),
//                 FOREIGN KEY (chatId) REFERENCES Chat(id),
//                 FOREIGN KEY (replyToId) REFERENCES Message(id)
//             );

//             CREATE TABLE IF NOT EXISTS MessageStatus (
//                 id TEXT PRIMARY KEY,
//                 messageId TEXT NOT NULL,
//                 userId TEXT NOT NULL,
//                 status TEXT DEFAULT 'PENDING',
//                 createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//                 FOREIGN KEY (messageId) REFERENCES Message(id),
//                 FOREIGN KEY (userId) REFERENCES User(id),
//                 UNIQUE (messageId, userId)
//             );

//         `)

//     return db;
// }


// const db = openDatabase();

// const executeSql = (sql, params = []) => {
//     return new Promise((resolve, reject) => {
//       db.transaction(tx => {
//         tx.executeSql(
//           sql,
//           params,
//           (_, result) => resolve(result),
//           (_, error) => reject(error)
//         );
//       });
//     });
//   };


// export const createChat = async (id, name, isGroup) => {
//   const sql = `INSERT INTO Chat (id, name, isGroup) VALUES (?, ?, ?)`;
//   return executeSql(sql, [id, name, isGroup]);
// };

// export const updateChat = async (id, name, isGroup) => {
//   const sql = `UPDATE Chat SET name = ?, isGroup = ? WHERE id = ?`;
//   return executeSql(sql, [name, isGroup, id]);
// };

// export const deleteChat = async (id) => {
//   const sql = `DELETE FROM Chat WHERE id = ?`;
//   return executeSql(sql, [id]);
// };


// export const addMembership = async (id, userId, chatId, role) => {
//   const sql = `INSERT INTO Membership (id, userId, chatId, role) VALUES (?, ?, ?, ?)`;
//   return executeSql(sql, [id, userId, chatId, role]);
// };

// export const updateMembership = async (id, role) => {
//   const sql = `UPDATE Membership SET role = ? WHERE id = ?`;
//   return executeSql(sql, [role, id]);
// };

// export const removeMembership = async (id) => {
//   const sql = `DELETE FROM Membership WHERE id = ?`;
//   return executeSql(sql, [id]);
// };

// // Message Table Helpers

// export const createMessage = async (id, content, mediaUrl, messageType, senderId, recipientId, chatId, replyToId) => {
//   const sql = `INSERT INTO Message (id, content, mediaUrl, messageType, senderId, recipientId, chatId, replyToId) 
//                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//   return executeSql(sql, [id, content, mediaUrl, messageType, senderId, recipientId, chatId, replyToId]);
// };

// export const updateMessage = async (id, content, mediaUrl, readByAll) => {
//   const sql = `UPDATE Message SET content = ?, mediaUrl = ?, readByAll = ? WHERE id = ?`;
//   return executeSql(sql, [content, mediaUrl, readByAll, id]);
// };

// export const deleteMessage = async (id) => {
//   const sql = `DELETE FROM Message WHERE id = ?`;
//   return executeSql(sql, [id]);
// };

// // MessageStatus Table Helpers

// export const createMessageStatus = async (id, messageId, userId, status) => {
//   const sql = `INSERT INTO MessageStatus (id, messageId, userId, status) VALUES (?, ?, ?, ?)`;
//   return executeSql(sql, [id, messageId, userId, status]);
// };

// export const updateMessageStatus = async (id, status) => {
//   const sql = `UPDATE MessageStatus SET status = ? WHERE id = ?`;
//   return executeSql(sql, [status, id]);
// };

// export const deleteMessageStatus = async (id) => {
//   const sql = `DELETE FROM MessageStatus WHERE id = ?`;
//   return executeSql(sql, [id]);
// };