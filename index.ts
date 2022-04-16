import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import videoRoutes from './routes/videos';

dotenv.config()

const app: Express = express();
const { PORT } = process.env || 8082;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use('/videos', videoRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
})