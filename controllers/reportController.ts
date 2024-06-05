import { Request, Response } from "express";
import pool from "../db_connection";
import { v4 as uudiv4 } from "uuid";
import fs from "fs";
import path from "path";
import { log } from "console";

class ReportControlles {
    async getReport(req: Request, res: Response) {
        try {
            const { id } = req.query;

            // Проверка наличия записи с заданным ID
            const checkSql = "SELECT * FROM Animals WHERE id = ?";
            const [checkResult] = await pool.query(checkSql, [id]);

            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                // Если запись с заданным ID не найдена, возвращаем сообщение об ошибке
                return res.status(404).json({ message: "Животное с указанным ID не найдено" });
            }

            // Запрос для получения полной информации о животном
            const fullInformationSql = `
            SELECT 
            Animals.id AS AnimalID,
            Animals.name AS AnimalName,
            Animals.species AS Species,
            Animals.gender AS Gender,
            Animals.height AS Height,
            Animals.weight AS Weight,
            Animals.date AS DateAdded,
            Animals.age AS Age,
            Animals.typeOfFeed AS TypeOfFeed,
            Animals.naturalArea AS NaturalArea,
            Animals.cageNum AS CageNumber,
            Animals.offspring AS HasOffspring,
            Animals.numOffspring AS NumberOfOffspring,
            Animals.idMale AS MaleID,
            Animals.idFemale AS FemaleID,
            Illnesses.name AS IllnessName,
            Illnesses.date AS IllnessDate,
            Vaccination.name AS VaccinationName,
            Vaccination.date AS VaccinationDate,
            WorkWithAnimals.id AS WorkID,
            WorkWithAnimals.idPosition AS WorkPositionID,
            WorkWithAnimals.dateFrom AS WorkDateFrom,
            WorkWithAnimals.dateTo AS WorkDateTo,
            Zoos.name AS ZooName,
            Zoos.date AS ZooDate
        FROM Animals
        LEFT JOIN Illnesses ON Animals.id = Illnesses.idAnimal
        LEFT JOIN Vaccination ON Animals.id = Vaccination.idAnimal
        LEFT JOIN WorkWithAnimals ON Animals.id = WorkWithAnimals.idAnimal
        LEFT JOIN Zoos ON Animals.id = Zoos.idAnimal
        WHERE Animals.id = ?
            `;
            const [fullInformationResult] = await pool.query(fullInformationSql, [id]);

            const result = JSON.stringify(fullInformationResult, null, 2);
            const fileName = `${uudiv4()}.txt`;
            const folderName = "C:/report";
            const filePath = path.join(folderName, fileName);
                        /*const filePath = path.join(__dirname, fileName);*/


            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName, { recursive: true });
            }

            fs.writeFile(filePath, result, (err) => {
                if (err) {
                    console.error("Ошибка при записи файла");
                    res.status(500).json({ message: "Ошибка при записи файла" });
                }

                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.error("Ошибка при загрузки файла");
                        res.status(500).json({ message: "Ошибка при загрузки файла" });
                    }

                });
            });

            // Возвращаем полученные данные
            //res.status(200).json(fullInformationResult);
        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }
}

export default new ReportControlles();
