import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});