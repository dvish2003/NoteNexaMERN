import express, { Router } from "express";
import userRoute from "./userRoute";
import noteRoute from "./noteRoute";

const rootRouter = Router();
rootRouter.use('/users',userRoute)
rootRouter.use('/notes',noteRoute)

export default rootRouter
