const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const setRoutes = require('./routes/index');
const { testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, async () => {
    await testConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});