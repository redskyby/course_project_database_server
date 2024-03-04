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
}

export default new AnimalController();
