import { saveUser, findUserByEmailAndPassword, findUserByEmail } from "./db";

/**
 * Inserts a new user into the database (localStorage).
 * Throws an error if a user with the given email already exists.
 * @param {string} nom - User's first name.
 * @param {string} prenom - User's last name.
 * @param {string} numero - User's phone number.
 * @param {string} email - User's email (must be unique).
 * @param {string} mot_de_passe - User's password.
 * @param {string} confirmer_mot_de_passe - User's confirmed password.
 * @returns {Object} The newly created user object.
 * @throws {Error} If a user with the email already exists or if saving fails.
 */
export const InsertUser = async (nom, prenom, numero, email, mot_de_passe, confirmer_mot_de_passe) => {
    try {
        // Check if user with this email already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        const newUser = {
            nom,
            prenom,
            numero,
            email,
            mot_de_passe,
            confirmer_mot_de_passe
        };
        const result = saveUser(newUser);
        console.log('Utilisateur inséré avec succès:', result);
        return result;
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
};

/**
 * Verifies a user's credentials by email and password.
 * @param {string} email - The user's email.
 * @param {string} mot_de_passe - The user's password.
 * @returns {Object|null} The user object if credentials are valid, otherwise null.
 * @throws {Error} If an error occurs during the verification process.
 */
export const verifyUser = async (email, mot_de_passe) => {
    try {
        const user = findUserByEmailAndPassword(email, mot_de_passe);
        return user || null;
    } catch (error) {
        console.error("Error verifying user:", error);
        throw error;
    }
};
