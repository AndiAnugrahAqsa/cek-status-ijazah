import express from "express";
import adminController from "../controllers/admin.js";

const loginRouter = express.Router();
    
loginRouter.get('/login', adminController.loginPage)
loginRouter.post('/login', adminController.login)

export default loginRouter