import ManageDB from "./template.js";

const generateTable = async() => {
    // Generate Admins Table
    await ManageDB("CREATE TABLE if not exists admins (id VARCHAR(15) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), is_super TINYINT(1))");    
    // Generate Statuses Table
    await ManageDB("CREATE TABLE if not exists statuses (id INT AUTO_INCREMENT PRIMARY KEY, label VARCHAR(255), information VARCHAR(255))");
    // Generate Proposers Table
    await ManageDB("CREATE TABLE if not exists proposers (id VARCHAR(15) PRIMARY KEY, name VARCHAR(255), entry_date DATE, regist_number VARCHAR(20), status_id INT, note VARCHAR(500), CONSTRAINT FK_StatusProposer FOREIGN KEY (status_id) REFERENCES statuses(id))");
}

const insertDefaultDataForAdminsTable = async() => {
        const data = [[
            '123456789',
            'A. Anugrah Aqsa',
            'admin123',
            1
        ]]
    ManageDB("INSERT IGNORE INTO admins (id, name, password, is_super) VALUES ? ", [data])    
}

const insertDefaultDataForStatusesTable = async() => {
    const data = [ 
        [
            1,
            'ditolak',
            'berkas kamu belum memenuhi syarat'
        ],[
            2,
            'diperiksa',
            'berkas kamu sedang diperiksa'
        ],[
            3,
            'diketik',
            'ijazah kamu sedang diketik'
        ],[
            4,
            'ditandatangani dekan',
            'ijazah kamu telah diusulkan ke dekan untuk ditandatangani'
        ],[
            5,
            'ditandatangani rektor',
            'ijazah kamu telah diusulkan ke rektor untuk ditandatangani'
        ],[
            6,
            'selesai',
            'silahkan datang ke biro akademik untuk mengambil ijazah'
        ],[
            7,
            'diambil',
            'ijazah telah diabmbil'
        ],
    ]
    ManageDB("INSERT IGNORE INTO statuses (id, label, information) VALUES ? ", [data])
}

const setUpDB = async() => {
    await generateTable()
    await insertDefaultDataForAdminsTable()
    await insertDefaultDataForStatusesTable()
}

export default setUpDB;