import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import videoRoutes from './routes/videos';
import jsonServer from 'json-server';

dotenv.config()

const app: Express = express();
const { PORT } = process.env || 8082;

app.use(cors());
app.use(jsonServer.router('./data/video-details.json'));
app.use(express.json());
app.use(express.static('public'))

app.use('/videos', videoRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
})