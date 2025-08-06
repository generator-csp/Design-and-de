const express = require('express');
const path = require('path');
const connectDB = require('./db');
const Student = require('./models/student');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission from signup.html
app.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send("All fields are required.");
    }

    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    try {
        const newStudent = new Student({ name, email, password });
        await newStudent.save();

        // Redirect to login page after successful signup
        res.redirect('/login.html');
    } catch (err) {
        console.error("Error saving signup data:", err.message);
        res.status(500).send("Internal Server Error.");
    }
});
// Serve index.html explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
