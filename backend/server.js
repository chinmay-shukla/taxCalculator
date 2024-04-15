// server.js
const express = require('express');
const taxRoutes = require('./routes/taxRoutes');
const cors = require('cors');



const app = express();



// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', taxRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
