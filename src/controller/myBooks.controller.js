const {pool} = require('../database');

async function registerUser(req,res){
    //-- Obtener los datos del nuevo usuario por el body de la petición
    const {name,last_name,email,password} = req.body;
    const params = [name,last_name,email,password];
    let sql = `INSERT INTO user (name,last_name,email,password) VALUES (?,?,?,?);`;

    try {
        const [result] = await pool.query(sql,params);
        let answer = {error: false, code: 200, message: "User successfullly registered", data:null, result:result};
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

async function loginUser(req,res){
    //-- Obtener los datos del nuevo usuario por el body de la petición
    const {email,password} = req.body;
    const params = [email,password];
    let sql = `SELECT id_user,name,last_name,email,photo FROM user WHERE email = ? AND password = ?;`;
    let answer;

    try {
        const [result] = await pool.query(sql,params);
        if (result.length === 0) {
            answer = {error: true, code: 200, message: "User not found", data:null, result:result};
        }else{
            answer = {error: false, code: 200, message: "User found", data:null, result:result};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

module.exports = {registerUser,loginUser}