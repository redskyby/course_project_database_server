import { Request, Response } from "express";
import pool from "../db_connection";

class EmployeesController {
    async addAnimal(req: Request, res: Response) {
        try {
            const {
                name,
                species,
                gender,
                height,
                weight,
                date,
                age,
                typeOfFeed,
                naturalArea,
                cageNum,
                offspring,
                numOffSpring,
                idMale = null,
                idFemale = null,
            } = req.body;

            const sql = `
                INSERT INTO Animals
                (name, species, gender, height, weight, date, age ,  typeOfFeed, naturalArea, cageNum, offspring, numOffSpring, idMale, idFemale)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)
            `;

            const values = [
                name,
                species,
                gender,
                height,
                weight,
                date,
                age,
                typeOfFeed,
                naturalArea,
                cageNum,
                offspring,
                numOffSpring,
                idMale,
                idFemale,
            ];

            const result = await pool.query(sql, values);
            // // @ts-ignore
            // const {insertId} = result[0];
            //но можно вернуть id вот так result[0].insertId
            return res.status(201).json(result);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async getAllAnimals(req: Request, res: Response) {
        try {
            const allAnimals = await pool.query("SELECT * FROM Animals");
            res.status(200).json(allAnimals[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }
    async deleteAnimal(req: Request, res: Response) {
        try {
            const { id } = req.query; // Получаем ID животного из параметра запроса

            // Проверяем наличие записи с заданным ID в таблице
            const checkSql = "SELECT * FROM Animals WHERE id = ?";
            const [checkResult] = await pool.query(checkSql, [id]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Животное с указанным ID не найдено" });
            }

            // Если запись с заданным ID найдена, выполняем операцию удаления
            const deleteSql = "DELETE FROM Animals WHERE id = ?";
            await pool.query(deleteSql, [id]);

            res.status(200).json({ message: "Животное удалено" });
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

            const sql = `SELECT * FROM Animals ORDER BY ${sort}`;

            const sortedAnimals = await pool.query(sql);

            // Возвращаем отсортированные данные
            res.status(200).json(sortedAnimals[0]);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }

    async getAnimalById(req: Request, res: Response) {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ message: "Не указано поле для id" });
            }

            // Выполняем запрос к базе данных для поиска животного по ID
            const sql = "SELECT * FROM Animals WHERE id = ?";
            const [animal] = await pool.query(sql, [id]);

            if (!Array.isArray(animal) || animal.length === 0) {
                return res.status(404).json({ message: "Животное с указанным ID не найдено" });
            }

            // Возвращаем найденное животное
            res.status(200).json(animal[0]);
        } catch (e: any) {
            console.error(e.message);
            res.status(500).json(e.message);
        }
    }

    async editAnimalById(req: Request, res: Response) {
        try {
            const {
                id,
                name,
                species,
                gender,
                height,
                weight,
                date,
                age,
                typeOfFeed,
                naturalArea,
                cageNum,
                offSpring,
                numOffSpring,
                idMale,
                idFemale,
            } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Не указано поле для id" });
            }

            // Выполняем запрос к базе данных для редактирования животного по ID
            const sql = `
                UPDATE Animals
                SET 
                    name = ?,
                    species = ?,
                    gender = ?,
                    height = ?,
                    weight = ?,
                    date = ?,
                    age = ?,
                    typeOfFeed = ?,
                    naturalArea = ?,
                    cageNum = ?,
                    offspring = ?,
                    numOffSpring = ?,
                    idMale = ?,
                    idFemale = ?
                WHERE id = ?
            `;
            const values = [
                name,
                species,
                gender,
                height,
                weight,
                date,
                age,
                typeOfFeed,
                naturalArea,
                cageNum,
                offSpring,
                numOffSpring,
                idMale,
                idFemale,
                id,
            ];

            await pool.query(sql, values);

            res.status(200).json({ message: "Животное успешно отредактировано" });
        } catch (e: any) {
            console.error(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default new EmployeesController();
