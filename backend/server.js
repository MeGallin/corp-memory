import express from 'express';
import dotenv from 'dotenv';

//Contollers
import memoryRoutes from './Routes/MemoryRoutes.js';

dotenv.config();
const app = express();

//Routes
app.use('/api/memory', memoryRoutes);
app.use('/api/memories', memoryRoutes);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} and you are running in ${MODE}`,
  );
});
