import express,{Response,Request,NextFunction} from "express";
import nodemailer from "nodemailer";
import {User, UserModel} from "../model/User";
import dotenv from "dotenv";
import {ApiError} from "../Errors/ApiError";
import {errorHandler} from "../middleware/errorHandle";
dotenv.config();


export const mailSender = async (userModel:User) =>{
    try {

        const ToEmail = userModel.email;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: (process.env.E_MAIL),
                pass: (process.env.PASSWORD)
            }
        })
        const mailOptions = {
            from: (process.env.E_MAIL),
            to: ToEmail,
            subject: 'Verification Code',
            text: `Your verification code is ${userModel.verificationCode}`
        };

        const info = await transporter.sendMail(mailOptions);
         if(info){
             console.log("Email sent: " + info.response);
             return info.response
         }


    }catch (error:any) {
        throw error
    }
}