import proposerController from "../controllers/proposer.js";
import adminController from "../controllers/admin.js";
import { verifyToken } from "../middlewares/auth_middleware.js";
import adminRouter from "./admin.js";
import loginRouter from "./login.js";
import proposerRouter from "./proposer.js";
import statusRouter from "./status.js";

const routes = (app) => {

    app.get('/favicon.ico', (req,res)=>{
        return;
    })

    app.post('/dashboard/check-token', verifyToken)
    app.get('/', proposerController.home)
    app.get('/:id', proposerController.getByID)
    app.post('/dashboard/change-password', adminController.changePassword)
    
    app.use('/dashboard', loginRouter)
    app.use('/dashboard', proposerRouter)    
    app.use('/dashboard', statusRouter)    
    app.use('/dashboard', adminRouter)
}

export default routes