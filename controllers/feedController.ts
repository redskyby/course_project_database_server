import { Request, Response } from "express";
import pool from "../db_connection";
class FeedController {
    async addFeed(req: Request, res: Response) {
        try {
            const { name, nameSupplier, typeOfFeed, size, price, date } = req.body;

            const sql = `
                INSERT INTO feed
                (name, nameSupplier, typeOfFeed, size, price, date)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const values = [name, nameSupplier, typeOfFeed, size, price, date];

            const result = await pool.query(sql, values);

            return res.status(201).json(result);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async getAllFeed(req: Request, res: Response) {
        try {
            const allFeed = await pool.query("SELECT * FROM feed");
            res.status(200).json(allFeed[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }
}

export default new FeedController();
