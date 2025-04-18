import express from "express";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(clerkMiddleware()); // this will add auth to req obj => req.auth.userId

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse req.body

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        data: null,
    });
})

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
    connectDB();
})