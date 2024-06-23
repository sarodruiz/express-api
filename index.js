import express from "express";
import cors from "cors";
import booksRoutes from './routes/booksRoutes.js';

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", booksRoutes);

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
});
