import AdminModel from "../models/admin.js"
import path from 'path';
import { fileURLToPath } from 'url';
import { checkPasswordValidation, hashingPassword, parseJwt } from "../helpers/utils.js";
import { generateToken } from "../middlewares/auth_middleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminModel = new AdminModel()

const adminController = {
    home : (req, res)=>{
        res.render(path.join(__dirname, '../views/home'), {id : null, name: null});
    },
    getByID: async(req, res)=>{
        const id = req.params.id
        const admin = await adminModel.getByCondition('*', `admins.id = ${id}`)
        res.render(path.join(__dirname, '../views/home'), (admin[0] ? admin[0] : {id : id, name: null}));
    },
    getAll: async(req, res)=>{
        const admins = await adminModel.getAll('id, name, is_super')
        res.render(path.join(__dirname, '../views/admin'), {admins: admins});
    },
    loginPage: async(req, res)=>{
        res.render(path.join(__dirname, '../views/login'));
    },
    create: async(req, res)=>{
        const data = req.body
        const admin = new AdminModel(data)
        admin.create()
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully add new admin",
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
        const admin = new AdminModel(data)
        admin.edit()
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully edit admin",
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
        const id = req.params.id;
        adminModel.delete(id)
        .then(()=>{
            res
            .status(200)
            .json({
                message: "successfully delete admin",
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
    login: async(req, res)=>{
        const bodyRequest = req.body
        const rows = await adminModel.getByCondition('*', `id = ${bodyRequest.id}`)
        const admin = rows[0]
        const isPasswordValid = await checkPasswordValidation(bodyRequest.password, admin.password)
        if (isPasswordValid) {
            const token = generateToken(admin)
            delete admin.password
            res
            .status(200)
            .json({
                token: token,
                admin
            })
        }else{
            res
            .status(400)
            .json({
                code: 400,
                message: "login failed",
            })
        }
    },
    changePassword: async(req, res)=>{
        const bodyRequest = req.body
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
        const tokenParsed = parseJwt(token)
        const existAdmin = await adminModel.getByCondition("*", `id = ${tokenParsed.id}`)
        const isOldPasswordValid = await checkPasswordValidation(bodyRequest.oldPassword, existAdmin[0].password)
        if (isOldPasswordValid) {
            const isNewPasswordValid = !(await checkPasswordValidation(bodyRequest.newPassword, existAdmin[0].password))
            if (isNewPasswordValid) {
                existAdmin[0].password = await hashingPassword(bodyRequest.newPassword)
                const admin = new AdminModel(existAdmin[0])
                admin.edit()
                res
                .status(200)
                .json({
                    message: "successfully change password"
                })
            }else{
                res
                .status(400)
                .json({
                    message: "new password is same with old password"
                })
            }
        }else{
            res
            .status(400)
            .json({
                message: "old password incorrect"
            })
        }
    }
}

export default adminController