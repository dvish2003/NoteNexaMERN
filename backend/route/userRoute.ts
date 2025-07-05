import {Router} from "express";
import {loginUser, userRegister, verifyCode} from "../controller/userController";


const router = Router();

router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/verifyCode", verifyCode);

export default router;