
const mongoose = require('mongoose'); // require = import

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/DBINSTA"); // connect to DB
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: `, error);
    }
}
module.exports = connectDB; // to export the function connectDB