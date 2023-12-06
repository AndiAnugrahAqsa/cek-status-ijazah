import express from "express";
import statusController from "../controllers/status.js";
import { verifyToken } from "../middlewares/auth_middleware.js";

const statusRouter = express.Router();

statusRouter.get('/status', statusController.getAll);
statusRouter.post('/status', verifyToken, statusController.create);
statusRouter.put('/status', verifyToken, statusController.edit);
statusRouter.delete('/status/:id', verifyToken, statusController.delete);

export default statusRouter;