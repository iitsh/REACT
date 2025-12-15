import { openDB } from "./db";

export const InsertUser = async (nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe) => {
    try {
        const db = await openDB();
        const result = await db.runAsync(
            'INSERT INTO users (nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe) VALUES (?, ?, ?, ?, ?, ?)', 
            [nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe]
        );
        console.log('Utilisateur inséré avec succès:', result);
        return result;
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
};

export const verifyUser = async (email, mot_de_passe) => {
    try {
        const db = await openDB();
        const result = await db.getAllAsync(
            'SELECT id, nom, prenom, email FROM users WHERE email = ? AND mot_de_passe = ?', 
            [email, mot_de_passe]
        );
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error verifying user:", error);
        throw error;
    }
};
