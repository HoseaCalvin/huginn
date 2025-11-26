import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import { sseRouter } from "./routes/sse.js";

import userRoutes from './routes/user.route.js';
import storyRoutes from './routes/story.route.js';
import reactionRoutes from './routes/reaction.route.js';
import commentRoutes from './routes/comment.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/user', userRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/reaction', reactionRoutes);
app.use('/api/comment', commentRoutes);
app.use('/sse', sseRouter);

const port = process.env.PORT || 5000

app.listen(port, () => {
    connectDB();
    console.log("Server started at PORT " + port);
})