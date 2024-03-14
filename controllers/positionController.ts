import { Request, Response } from "express";
import pool from "../db_connection";

class PositionController {
    async addPosition(req: Request, res: Response) {
        try {
            const { name, salary , access } = req.body;

            const sql = `
                INSERT INTO positions
                (name, salary , access)
                VALUES (?, ?, ?)
            `;

            const values = [name, salary , access ];

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

    async sortBy(req: Request, res: Response) {
        try {
            const { sort } = req.query;

            if (!sort) {
                return res.status(400).json({ message: "Не указано поле для сортировки" });
            }

            const sql = `SELECT * FROM feed ORDER BY ${sort}`;

            const sortedFeed = await pool.query(sql);

            // Возвращаем отсортированные данные
            res.status(200).json(sortedFeed[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async editFeedById(req: Request, res: Response) {
        try {
            const { id, name, nameSupplier, typeOfFeed, size, price, date } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Не указано поле для id" });
            }

            // Выполняем запрос к базе данных для редактирования данных по ID
            const sql = `
            UPDATE Feed
            SET 
                name = ?,
                nameSupplier = ?,
                typeOfFeed = ?,
                size = ?,
                price = ?,
                date = ?
            WHERE id = ?
        `;
            const values = [name, nameSupplier, typeOfFeed, size, price, date, id];

            await pool.query(sql, values);

            res.status(200).json({ message: "Данные успешно отредактированы" });
        } catch (e: any) {
            console.error(e.message);
            res.status(500).json({ error: e.message });
        }
    }
}

export default new PositionController();