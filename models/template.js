import connection from "./mysql.js"

const ManageDB = (query, value = null) => {
    return new Promise((resolve, reject)=>{
        connection.query(query, value, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

export default ManageDB