import { Request, Response } from "express";

class AnimalController {
    async addAnimal(req : Request, res : Response) {

        return res.json({"Hello" : "World"})
    }
}

export default new AnimalController();
