import ManageDB from './template.js'

class ProposerModel {
    constructor(data={}){
        this.id = data.id
        this.name = data.name
        this.entry_date = data.entry_date
        this.regist_number = data.regist_number
        this.status_id = data.status_id
        this.note = data.note
    }

    getAll = (column)=>{
        return ManageDB(`SELECT ${column} FROM proposers LEFT JOIN statuses ON statuses.id=proposers.status_id`)
    }

    getByCondition = (column, condition)=>{
        return ManageDB(`SELECT ${column} FROM proposers LEFT JOIN statuses ON statuses.id=proposers.status_id WHERE ${condition}`)
    }

    create = ()=>{
        const data = [[
            this.id,
            this.name,
            this.entry_date,
            this.regist_number,
            this.status_id,
            this.note
        ]]
        return ManageDB(`INSERT INTO proposers (id, name, entry_date, regist_number, status_id, note) VALUES ?`, [data])
    }

    edit = async()=>{
        const data = [
            this.name,
            this.entry_date,
            this.regist_number,
            this.status_id,
            this.note,
            this.id,
        ]
        return ManageDB(`UPDATE proposers SET name = ?, entry_date = ?, regist_number = ?, status_id = ?, note = ? WHERE id = ?`, data)
    }

    delete = (id)=>{
        return ManageDB(`DELETE FROM proposers WHERE id = ?`, id)
    }
}

export default ProposerModel