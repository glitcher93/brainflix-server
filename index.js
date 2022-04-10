require('dotenv').config();
const express = require('express');
const cors = require('cors');
const videoRoutes = require('./routes/videos')
const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use('/videos', videoRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
})