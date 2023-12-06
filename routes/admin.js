import express from "express";
import adminController from "../controllers/admin.js";
import { verifyToken } from "../middlewares/auth_middleware.js";

const adminRouter = express.Router();

adminRouter.get('/admin', adminController.getAll)
adminRouter.post('/admin', verifyToken, adminController.create)
adminRouter.put('/admin', verifyToken, adminController.edit)
adminRouter.delete('/admin/:id', verifyToken, adminController.delete)

export default adminRouter