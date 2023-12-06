import StatusModel from "../models/status.js"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statusModel = new StatusModel()

const statusController = {
    getAll: async(req, res)=>{
        const status = await statusModel.getAll('*')
        res.render(path.join(__dirname, '../views/status'), {status: status});
    },
    create: async(req, res)=>{
        const data = req.body
        const status = new StatusModel(data)
        status.create()
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully add new status",
            })
        })
        .catch(err => {
            res
            .status(400)
            .json({
                code: 400,
                message: err.message,
            })
        });
    },
    edit: async(req, res) =>{
        const data = req.body
        const status = new StatusModel(data)
        status.edit()
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully edit status",
            })
        })
        .catch(err => {
            res
            .status(400)
            .json({
                code: 400,
                message: err.message,
            })
        });
    },
    delete: async(req, res)=>{
        const id = req.params.id
        statusModel.delete(id)
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully delete status",
            })
        })
        .catch(err => {
            res
            .status(400)
            .json({
                code: 400,
                message: err.message,
            })
        });
    }
}

export default statusController