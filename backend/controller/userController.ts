import { Request, Response , NextFunction} from 'express';
import { UserModel } from '../model/User';
import {VerificationCodeGenerator} from "../model/VerificationCodeGenerator";
import {mailSender} from "./mailSender";
import {VerifyCredentials} from "../model/VerifyCredentials";
import jwt from "jsonwebtoken";

const SECRET ="ExiXGmnNx2pWE7eXj3sBtFabIjTpSZQ3"



// user register function
export const userRegister  = async (req:Request,res:Response,next:NextFunction):Promise<any>=> {
    console.log("request body:", req.body);
    try{
        const email:string = req.body.email
        const existUser = await UserModel.findOne({email});

        if(existUser){
            return res.status(400).json({
                message: "User already registered with this email"
            });
        }

        const user = new UserModel(req.body);

        const verificationCode_1:number = VerificationCodeGenerator();

        user.verificationCode = verificationCode_1;

        console.log("user  ",user)

        if (!user){
            res.status(400).send({
                message:"invalid Credentials"
            })
        }

        const newUser = await user.save();
        if(newUser){
           const mailInfo =  await mailSender(user)
            console.log("Mail info:", mailInfo);
                 return res.status(200).json({
                    message: `User registered successfully and verification code sent to ${user.email}`,
                })

        }
        else {
           return  res.status(400).json({
                message: "User registration failed"
            });
        }


    }catch (err:any){
        console.error("Error in user registration:", err);
        next(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

//user verify function
export const verifyCode = async (req:Request,res:Response,next:NextFunction):Promise<any>=> {
     try{
         const verifyCred:VerifyCredentials = req.body;

         console.log("verifyCred:", verifyCred);

         const email:string = verifyCred.email;
         const verifyCode:number = verifyCred.verificationCode;

         console.log("verifyCode:", verifyCode);
         console.log("verify email:", email);

         const user =await UserModel.findOne({email})

         if(user){
             if(user.verificationCode === verifyCode){
                 user.isVerified = true;
                 user.verificationCode = 123456;
                 await user.save();
                 return res.status(200).json({
                     message: "User verified successfully"
                 });
             } else {
                 return res.status(400).json({
                     message: "Invalid verification code"
                 });
             }
         }
     }catch (err:any){
        console.error("Error in user verification:", err);
        next(err);
        return res.status(500).json({
            message: "Internal server error"
        });
     }

}

export const loginUser = async (req:Request,res:Response,next:NextFunction):Promise<any>=> {
    const email:string = req.body.email;
    const password:string = req.body.password

    try{
        const user =await  UserModel.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"Invalid user Credentials"
            })
        }

        if(user.password === password){
            if(user.isVerified){
                const token = jwt.sign({email:email},SECRET,{expiresIn:"1h"})
                return res.status(200).json({
                    message:token
                })
            }
            return res.status(404).json({
                message:"Your are not verify user please verify"
            })
        }
    }catch (error:any){
        next(error)
    }

}
