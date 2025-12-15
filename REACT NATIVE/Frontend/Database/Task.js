import { openDB } from "./db";

export const InsertUser = async (nom, email, mot_de_passe) => {
  try {
    const db = await openDB();
    await db.runAsync(
      'INSERT INTO users (Nom, email, mot_de_passe) VALUES (?, ?, ?)',
      [nom, email, mot_de_passe]
    );
    console.log(`Utilisateur "${nom}" ajouté avec succès`);
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'utilisateur :", error);
    throw error;
  }
};

export const verifyUser = async (email, mot_de_passe) => {
  try {
    const db = await openDB();
    const result = await db.getAllAsync(
      'SELECT id, Nom, email FROM users WHERE email = ? AND mot_de_passe = ?',
      [email, mot_de_passe]
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    throw error;
  }
};