import { Request, Response } from "express";
import pool from "../db_connection";

class ReportControlles {
    async getReport(req: Request, res: Response) {
        try{

        } catch (e: any) {
            console.error(e.message); // Вывод ошибки в консоль для дальнейшей диагностики
            res.status(500).json(e.message);
        }
    }
}

export default new ReportControlles();