import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'bd', // Nome do container do banco de dados
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'pass',
  database: process.env.DB_NAME || 'BANCO_DADOS_IT_TALENT',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getAlunos(){
    const [rows] = await pool.query(`SELECT * FROM ALUNOS;`);
    return rows;
}

export async function getAluno(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM ALUNOS
    WHERE id = ?;
    `, [id]);
    return rows[0];
}

export async function createAluno(nome, idade, cidade){
    const [result] = await pool.query(`
    INSERT INTO ALUNOS (nome, idade, cidade)
    VALUES (?, ?, ?);
    `, [nome, idade, cidade]);
    const id = result.insertId;
    return getAluno(id);
}
