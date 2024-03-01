import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import pool from "./db_connection";

config();

const app: Express = express();
const port: number = parseInt(process.env.PORT!, 10) || 5001;

app.use(cors());
app.use(express.json());


const start = async () => {
    try {
        await pool.getConnection();
        console.log("Connected to the database");

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
