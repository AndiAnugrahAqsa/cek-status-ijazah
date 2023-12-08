import { hashingPassword } from '../helpers/utils.js'
import ManageDB from './template.js'

class AdminModel {
    constructor(data={}){
        this.setAdmin(data)
    }

    setAdmin = (data={}) => {
        this.id = data.id
        this.name = data.name
        this.password = data.password || "admin123"
        this.is_super = data.is_super
    }

    getAll = (column)=>{
        return ManageDB(`SELECT ${column} FROM admins`)
    }

    getByCondition = (column, condition)=>{
        return ManageDB(`SELECT ${column} FROM admins WHERE ${condition}`)
    }

    create = async()=>{
        this.password = await hashingPassword(this.password)
        const data = [[
            this.id,
            this.name,
            this.password,
            this.is_super
        ]]
        return ManageDB(`INSERT INTO admins (id, name, password, is_super) VALUES ?`, [data])
    }

    edit = async()=>{
        const data = [
            this.name,
            this.password,
            this.is_super,
            this.id,
        ]
        return ManageDB(`UPDATE admins SET name = ?, password = ?, is_super = ? WHERE id = ?`, data)
    }

    delete = (id)=>{
        return ManageDB(`DELETE FROM admins WHERE id = ?`, id)
    }
}

export default AdminModel