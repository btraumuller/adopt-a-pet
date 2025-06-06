import express from 'express';
import dogs from './dogs.js';

export const app = express();
app.use('/api/dogs', dogs);
