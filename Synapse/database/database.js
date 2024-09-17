const { Platform } = require("react-native");
import * as SQLite from 'expo-sqlite';

function openDatabase(){
    if(Platform.OS === 'web'){
        return {
            transaction: () => {
                return  {
                    executeSql: () => {},
                }
            } 
        }
    }

    const db = SQLite.openDatabaseSync("Synapse.db")
    db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY NOT NULL,phoneNumber INTEGER NOT NULL, firstName TEXT NOT NULL, lastName Text)
        `)

    return db;
}


const db = openDatabase();

export const createUser = async({firstName, lastName, phoneNumber}) => {
    try{
        await db.runAsync(`INSERT INTO user (phoneNumber, firstName, lastName) values (?, ? , ?)`, phoneNumber, firstName, lastName)
        console.log("user Created")
    }catch(error){
        console.log(error);
    }
}
