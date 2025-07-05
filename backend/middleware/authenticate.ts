import jwt from "jsonwebtoken";
const SECRET ="ExiXGmnNx2pWE7eXj3sBtFabIjTpSZQ3"
import {NextFunction,Request,Response} from "express";


export const authenticate = (req: Request, res: Response, next: NextFunction):any => {
    const authHeader = req.headers.authorization;

    console.log("AuthHeader :",authHeader)

    if(!authHeader){
        return res.status(401).json({
            message:"Token header missing",
        })
    }

    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"token is missing"
        })
    }

    try{
        const decode = jwt.verify(token,SECRET);
        (req as any).user = decode;
        console.log("AuthenticatePassed")
        next()

    }catch (error:any){
        res.status(401).json({
            message:"Unauthorize token"
        })
        }
  
}