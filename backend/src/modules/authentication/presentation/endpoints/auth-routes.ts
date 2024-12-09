import { Router } from "express";
import { loginUser } from "./user/login-user/login-user";
import { registerUser } from "./user/register-user/register-user";


const router = Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;