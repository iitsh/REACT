const app = require("./expressApp");

const ConnectDB = require("./db");

ConnectDB();

// Add logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request received: ${req.method} ${req.url}`);
    next();
});

app.listen(3000, '0.0.0.0', () => {
    console.log("Server started on port 3000 (accessible via 0.0.0.0)");
});