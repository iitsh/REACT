// Database initialization for web version using localStorage
// Adapted from React Native expo-sqlite version

/**
 * Initializes the database structure in localStorage
 * Creates the users table structure if it doesn't exist
 * This matches the React Native version's database schema
 */
export const initDB = async () => {
    try {
        // Check if users table structure exists in localStorage
        const users = localStorage.getItem('users');

        if (!users) {
            // Initialize empty users array with proper structure
            localStorage.setItem('users', JSON.stringify([]));
            console.log("Table 'users' créée avec succès.");
        } else {
            console.log("Table 'users' already exists.");
        }

        // Verify the structure is valid JSON
        JSON.parse(localStorage.getItem('users'));

        return true;
    } catch (error) {
        console.error("Error initializing database:", error);
        // If there's an error, reset the structure
        localStorage.setItem('users', JSON.stringify([]));
        return false;
    }
};
