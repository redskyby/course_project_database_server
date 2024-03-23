import { Request, Response } from "express";
import pool from "../db_connection";

class WorkWithAnimalsController {
    async addWorkWithAnimal(req: Request, res: Response) {
        try {
            const { idPosition, idAnimal, dateFrom, dateTo } = req.body;

            const sql = `
                INSERT INTO workwithanimals
                (idPosition, idAnimal , dateFrom ,dateTo )
                VALUES (?, ?, ? , ?)
            `;

            const values = [idPosition, idAnimal, dateFrom, dateTo];

            const result = await pool.query(sql, values);

            return res.status(201).json(result);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async getAllWorkWithAnimal(req: Request, res: Response) {
        try {
            const allPositions = await pool.query("SELECT * FROM workwithanimals");
            res.status(200).json(allPositions[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async deleteWorkWithAnimals(req: Request, res: Response) {
        try {
            const { idAnimal } = req.body; // Получаем ID вакцины из параметра запроса

            // Проверяем наличие записи с заданным ID в таблице
            const checkSql = "SELECT * FROM workwithanimals WHERE idAnimal = ? ";
            const [checkResult] = await pool.query(checkSql, [idAnimal]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Работа с указанным ID  не найдена" });
            }

            // Если запись с заданным ID найдена, выполняем операцию удаления
            const deleteSql = "DELETE FROM workwithanimals WHERE idAnimal = ?";
            await pool.query(deleteSql, [idAnimal]);

            res.status(200).json({ message: "Запись о работе удалена" });
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

            const sql = `SELECT * FROM workwithanimals ORDER BY ${sort}`;

            const sortedWorkWithAnimal = await pool.query(sql);

            // Возвращаем отсортированные данные
            res.status(200).json(sortedWorkWithAnimal[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async editWorkWithAnimalById(req: Request, res: Response) {
        try {
            const { idPosition, idAnimal, dateFrom, dateTo } = req.body;

            if (!idAnimal) {
                return res.status(400).json({ message: "Не указано поле для id работы" });
            }

            const checkSql = "SELECT * FROM workwithanimals WHERE  idAnimal = ?";
            const [checkResult] = await pool.query(checkSql, [idAnimal]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Работа с указанным ID  не найдена" });
            }

            // Выполняем запрос к базе данных для редактирования данных по ID
            const sql = `
            UPDATE workwithanimals
            SET
                idPosition = ?,
                dateFrom = ?,
                dateTo = ?
            WHERE idAnimal = ?
        `;
            const values = [idPosition, dateFrom, dateTo, idAnimal];

            await pool.query(sql, values);

            res.status(200).json({ message: "Данные успешно отредактированы" });
        } catch (e: any) {
            console.error(e.message);
            res.status(500).json({ error: e.message });
        }
    }
}

export default new WorkWithAnimalsController();
