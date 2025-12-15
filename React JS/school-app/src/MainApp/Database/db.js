// Simplified Mock DB implementation using LocalStorage for Web compatibility

/**
 * Retrieves all users from localStorage.
 * @returns {Array} An array of user objects.
 */
export const getUsers = () => {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error("Error getting users from localStorage:", error);
        return [];
    }
};

/**
 * Saves a new user or updates an existing user in localStorage.
 * If the user has an 'id', it attempts to update. Otherwise, it adds a new user.
 * @param {Object} newUser - The user object to save.
 * @returns {Object} The saved user object, including a new ID if it was a new user.
 */
export const saveUser = (newUser) => {
    try {
        const users = getUsers();
        let userToSave = { ...newUser };

        if (userToSave.id) {
            // Update existing user
            const index = users.findIndex(u => u.id === userToSave.id);
            if (index !== -1) {
                users[index] = userToSave;
            } else {
                // If ID exists but user not found, add as new
                userToSave.id = Date.now(); // Assign new ID
                users.push(userToSave);
            }
        } else {
            // Add new user
            userToSave.id = Date.now();
            users.push(userToSave);
        }
        localStorage.setItem('users', JSON.stringify(users));
        return userToSave;
    } catch (error) {
        console.error("Error saving user to localStorage:", error);
        throw new Error("Failed to save user.");
    }
};

/**
 * Finds a user by email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */
export const findUserByEmailAndPassword = (email, password) => {
    try {
        const users = getUsers();
        return users.find(u => u.email === email && u.mot_de_passe === password);
    } catch (error) {
        console.error("Error finding user by email and password:", error);
        return undefined;
    }
};

/**
 * Finds a user by email.
 * @param {string} email - The user's email.
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */
export const findUserByEmail = (email) => {
    try {
        const users = getUsers();
        return users.find(u => u.email === email);
    } catch (error) {
        console.error("Error finding user by email:", error);
        return undefined;
    }
};
