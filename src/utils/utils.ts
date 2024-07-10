import { Request, Response } from 'express';
export const errorHandler = (req: Request, res: Response) => {
    if(req.params[0]==='/cart/total'){
        res.status(405).send({ error: 'Invalid method' })
    }
    else{
        res.status(404).send({ error: 'Invalid route' })
    }
    

}