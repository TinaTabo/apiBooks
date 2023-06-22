const {pool} = require('../database');

//-- Funciones para controlar al usuario.

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

//-- Funciones para gestionar los libros.

async function getBook(req,res){
    const {id_user,id_book} = req.query;
    const params = [id_user,id_book];
    let answer;
    let sql;
    //-- Definir las peticiones dependiendo de los dos casos q se pueden dar
    if (id_user != undefined && id_book == undefined) {
        sql = `SELECT * FROM book WHERE id_user = ?;`;
    }else{
        sql = `SELECT * FROM book WHERE id_user = ? AND id_book = ?;`;
    }

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Book not found", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book found", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

async function postBook(req,res){
    const {id_user,title,type,author,price,photo} = req.body;
    const params = [id_user,title,type,author,price,photo];
    let sql= `INSERT INTO book (id_user,title,type,author,price,photo) VALUES (?,?,?,?,?,?);`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Registration error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book registered correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}


async function putBook(req,res){
    const {id_book,id_user,title,type,author,price,photo} = req.body;
    const params = [
        title? title: null,
        type? type: null,
        author? author: null,
        price? price: null,
        photo? photo: null,
        id_book? id_book: null,
        id_user? id_user: null
    ];
    let sql = `UPDATE book SET title = COALESCE(?,title),
                                    type = COALESCE(?,type),
                                    author = COALESCE(?,author),
                                    price = COALESCE(?,price),
                                    photo = COALESCE(?,photo)
                                    WHERE id_book = ? AND id_user = ?;`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Update error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book updated correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

async function delBook(req,res){
    const {id_book} = req.body;
    const params = [id_book];
    let sql= `DELETE FROM book WHERE id_book = ?`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Delete error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Book deleted correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}

module.exports = {registerUser,loginUser,getBook,postBook,putBook,delBook};