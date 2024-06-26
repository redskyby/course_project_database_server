import { Request, Response } from "express";
import pool from "../db_connection";

class PositionController {
    async addPosition(req: Request, res: Response) {
        try {
            const { name, salary, access } = req.body;

            const sql = `
                INSERT INTO positions
                (name, salary , access)
                VALUES (?, ?, ?)
            `;

            const values = [name, salary, access];

            const result = await pool.query(sql, values);

            return res.status(201).json(result);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async getAllPositions(req: Request, res: Response) {
        try {
            const allPositions = await pool.query("SELECT * FROM positions");
            res.status(200).json(allPositions[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async deletePosition(req: Request, res: Response) {
        try {
            const { id } = req.query; // Получаем ID корма из параметра запроса

            // Проверяем наличие записи с заданным ID в таблице
            const checkSql = "SELECT * FROM positions WHERE id = ?";
            const [checkResult] = await pool.query(checkSql, [id]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Позиция с указанным ID не найден" });
            }

            // Если запись с заданным ID найдена, выполняем операцию удаления
            const deleteSql = "DELETE FROM positions WHERE id = ?";
            await pool.query(deleteSql, [id]);

            res.status(200).json({ message: "Позиция удалена" });
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

            const sql = `SELECT * FROM positions ORDER BY ${sort}`;

            const sortedPositions = await pool.query(sql);

            // Возвращаем отсортированные данные
            res.status(200).json(sortedPositions[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async editPositionById(req: Request, res: Response) {
        try {
            const { id, name, salary, access } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Не указано поле для id" });
            }

            // Выполняем запрос к базе данных для редактирования данных по ID
            const sql = `
            UPDATE positions
            SET 
                name = ?,
                salary = ?,
                access = ?
            WHERE id = ?
        `;
            const values = [name, salary, access, id];

            await pool.query(sql, values);

            res.status(200).json({ message: "Данные успешно отредактированы" });
        } catch (e: any) {
            console.error(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default new PositionController();
