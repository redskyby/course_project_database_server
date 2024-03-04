import { Request, Response } from "express";
import pool from "../db_connection";

class AnimalController {
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
                offSpring,
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
                offSpring,
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

            res.status(200).json({ message: "Животное удалено"});
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }
}

export default new AnimalController();
