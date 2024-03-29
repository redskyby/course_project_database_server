import { Request, Response } from "express";
import pool from "../db_connection";

class VaccinationController {
    async addVaccination(req: Request, res: Response) {
        try {
            const { date, name, idAnimal } = req.body;

            const checkSql = "SELECT id FROM animals WHERE id = ?";
            const [animal] = await pool.query(checkSql, [idAnimal]);

            if (!animal) {
                return res.status(404).json({ message: "Животное с указанным идентификатором не найдено." });
            }

            const checkAgeSql = "SELECT date FROM animals WHERE id = ?";
            // @ts-ignore
            const [[{ date: dateOfBirth }]] = await pool.query(checkAgeSql, [idAnimal]);
            const serverDate = new Date(date);

            if (serverDate < dateOfBirth) {
                return res.status(400).json({ message: "Дата должна быть больше даты рождения животного." });
            }

            const sql = `
                INSERT INTO vaccination
                (date, name , idAnimal)
                VALUES (?, ?, ?)
            `;

            const values = [date, name, idAnimal];

            const result = await pool.query(sql, values);

            return res.status(201).json(result);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async getAllVaccinations(req: Request, res: Response) {
        try {
            const allPositions = await pool.query("SELECT * FROM vaccination");
            res.status(200).json(allPositions[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async deleteVaccination(req: Request, res: Response) {
        try {
            const { date, idAnimal } = req.body; // Получаем ID вакцины из параметра запроса

            // Проверяем наличие записи с заданным ID в таблице
            const checkSql = "SELECT * FROM vaccination WHERE idAnimal = ? AND date = ?";
            const [checkResult] = await pool.query(checkSql, [idAnimal, date]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Вакцинация с указанным ID или датой не найдена" });
            }

            // Если запись с заданным ID найдена, выполняем операцию удаления
            const deleteSql = "DELETE FROM vaccination WHERE idAnimal = ? AND date = ?";
            await pool.query(deleteSql, [idAnimal, date]);

            res.status(200).json({ message: "Запись о вакцинации удалена" });
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

            const sql = `SELECT * FROM vaccination ORDER BY ${sort}`;

            const sortedVaccinations = await pool.query(sql);

            // Возвращаем отсортированные данные
            res.status(200).json(sortedVaccinations[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async editVaccinationById(req: Request, res: Response) {
        try {
            const { date, name, idAnimal } = req.body;

            if (!idAnimal || !date) {
                return res.status(400).json({ message: "Не указано поле для id или дата" });
            }

            const checkSql = "SELECT * FROM vaccination WHERE idAnimal = ? AND date = ?";
            const [checkResult] = await pool.query(checkSql, [idAnimal, date]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Вакцинация с указанным ID или датой не найдена" });
            }

            const checkAgeSql = "SELECT date FROM animals WHERE id = ?";
            // @ts-ignore
            const [[{ date: dateOfBirth }]] = await pool.query(checkAgeSql, [idAnimal]);
            const serverDate = new Date(date);

            if (serverDate < dateOfBirth) {
                return res.status(400).json({ message: "Дата должна быть больше даты рождения животного." });
            }

            // Выполняем запрос к базе данных для редактирования данных по ID
            const sql = `
            UPDATE vaccination
            SET
                date = ?,
                name = ?
            WHERE idAnimal = ?
        `;
            const values = [date, name, idAnimal];

            await pool.query(sql, values);

            res.status(200).json({ message: "Данные успешно отредактированы" });
        } catch (e: any) {
            console.error(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default new VaccinationController();
