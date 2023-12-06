import ProposerModel from "../models/proposer.js"
import StatusModel from "../models/status.js";
import { changeDateFormat } from "../helpers/utils.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const proposerModel = new ProposerModel()
const statusModel = new StatusModel()

const proposerController = {
    home : (req, res)=>{
        res.render(path.join(__dirname, '../views/home'), {id : null, name: null});
    },
    getByID: async(req, res)=>{
        const id = req.params.id
        const proposer = await proposerModel.getByCondition('*, proposers.id', `proposers.id = ${id}`)
        if (proposer[0]) {
            proposer[0].entry_date = changeDateFormat(proposer[0].entry_date)
        }
        res.render(path.join(__dirname, '../views/home'), (proposer[0] ? proposer[0] : {id : id, name: null}));
    },
    getAll: async(req, res)=>{
        const proposers = await proposerModel.getAll('*, proposers.id')
        const status = await statusModel.getAll('*')
        proposers.map((proposer)=>{
            proposer.entry_date = changeDateFormat(proposer.entry_date)
            return proposer
        })
        res.render(path.join(__dirname, '../views/proposer'), {proposers: proposers, status: status});
    },
    create: async(req, res)=>{
        const data = req.body
        const proposer = new ProposerModel(data)
        proposer.create()
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully add new proposer",
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
        const proposer = new ProposerModel(data)
        proposer.edit()
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully edit proposer",
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
        proposerModel.delete(id)
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
    },
}

export default proposerController