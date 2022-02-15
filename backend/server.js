import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//Contollers
import memoryRoutes from './Routes/MemoryRoutes.js';

dotenv.config();
const app = express();
app.use(express.json()); // This needed to accept json data

//Routes
app.use('/api/memory', memoryRoutes);
app.use('/api/memories', memoryRoutes);

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
