import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import pool from "./db_connection";

config();

const app: Express = express();
const port: number = parseInt(process.env.PORT!, 10) || 5001;

app.use(cors());
app.use(express.json());

// app.post("/create_table", async (req: Request, res: Response) => {
//     try {
//         // SQL-запрос для создания таблицы (здесь просто пример)
//         const createTableQuery = `
//             CREATE TABLE IF NOT EXISTS example_table (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(255) NOT NULL
//             )
//         `;
//
//         // Выполнение SQL-запроса к базе данных
//         await pool.query(createTableQuery);
//
//         res.status(200).send("Таблица успешно создана");
//     } catch (error) {
//         console.error("Ошибка при создании таблицы:", error);
//         res.status(500).send("Ошибка при создании таблицы");
//     }
// });

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
