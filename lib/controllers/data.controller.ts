import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { IData } from '../modules/models/data.model';


class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();


    constructor() {
        this.initializeRoutes();

    }


    private initializeRoutes() {
        this.router.get(`${this.path}/get`, this.getAll);
        this.router.post(`${this.path}/create`, this.dataService.create);
        this.router.delete(`${this.path}/:id`, this.dataService.delete);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data: IData[] = await this.dataService.getAll();
            response.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}


export default DataController;
