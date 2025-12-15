import { openDB } from "./db";

export const initDB = async () => {
  const db = await openDB(); //ouverture de la base de données
  
   await db.execAsync(` 
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      Nom TEXT , email TEXT UNIQUE, mot_de_passe TEXT
    );
  `);
  console.log("Table 'users' created successfully.");
};