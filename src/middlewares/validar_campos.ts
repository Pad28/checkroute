import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const valid = (req: Request, res:Response, next: NextFunction)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.json(errores);
    }

    next();
}