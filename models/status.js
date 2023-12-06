import ManageDB from './template.js'

class StatusModel {
    constructor(data={}){
        this.id = data.id
        this.label = data.label
        this.information = data.information
    }

    getAll = (column)=>{
        return ManageDB(`SELECT ${column} FROM statuses`)
    }

    getByCondition = (column, condition)=>{
        return ManageDB(`SELECT ${column} FROM statuses WHERE ${condition}`)
    }

    create = ()=>{
        const data = [[
            this.id,
            this.label,
            this.information,
        ]]
        return ManageDB(`INSERT INTO statuses (id, label, information) VALUES ?`, [data])
    }

    edit = async()=>{
        const data = [
            this.label,
            this.information,
            this.id,
        ]
        return ManageDB(`UPDATE statuses SET label = ?, information = ? WHERE id = ?`, data)
    }

    delete = (id)=>{
        return ManageDB(`DELETE FROM statuses WHERE id = ?`, id)
    }
}

export default StatusModel