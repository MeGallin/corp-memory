import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//Contollers
import memoryRoutes from './Routes/MemoryRoutes.js';
import userRoutes from './Routes/UserRoutes.js';
import contactFormRoutes from './routes/contactFormRoutes.js';

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json()); // This needed to accept json data

//Routes
app.use('/api/memory', memoryRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', userRoutes);
//Contact form
app.use('/api/contact', contactFormRoutes);

// @Error handling middleware
app.use(notFound);
app.use(errorHandler);
// @Error handling middleware

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} and you are running in ${MODE}`,
  );
});
