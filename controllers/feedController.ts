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

    async deleteFeed(req: Request, res: Response) {
        try {
            const { id } = req.query; // Получаем ID корма из параметра запроса

            // Проверяем наличие записи с заданным ID в таблице
            const checkSql = "SELECT * FROM feed WHERE id = ?";
            const [checkResult] = await pool.query(checkSql, [id]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Корм с указанным ID не найден" });
            }

            // Если запись с заданным ID найдена, выполняем операцию удаления
            const deleteSql = "DELETE FROM feed WHERE id = ?";
            await pool.query(deleteSql, [id]);

            res.status(200).json({ message: "Корм удален" });
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }
}

export default new FeedController();
