import express from "express";
import proposerController from "../controllers/proposer.js";
import { verifyToken } from "../middlewares/auth_middleware.js";

const proposerRouter = express.Router();

proposerRouter.get('/proposer', proposerController.getAll)
proposerRouter.post('/proposer', verifyToken, proposerController.create)
proposerRouter.put('/proposer', verifyToken, proposerController.edit)
proposerRouter.delete('/proposer/:id', verifyToken, proposerController.delete)

export default proposerRouter