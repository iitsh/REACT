import { openDB } from "./db";

export const initDB = async () => {
  const db = await openDB();
  
  await db.execAsync(` 
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      nom TEXT,
      prenom TEXT,
      numero TEXT,
      email TEXT UNIQUE, 
      mot_de_passe TEXT,
      confirmer_mot_de_passe TEXT
    );
  `);
  console.log("Table 'users' créée avec succès.");
};
