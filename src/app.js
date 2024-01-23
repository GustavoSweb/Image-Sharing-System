import dotenv from 'dotenv'
dotenv.config()

import express  from "express";
const app = express()
import mongoose from "mongoose";
import chalk from 'chalk';
import UserRouter from './routers/User.js';

app.use(express.urlencoded({extended:false}))
app.use(express.json())
async function main(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(chalk.green('Banco de dados Conectado'))
    }catch(err){
        console.log(err)
        throw new Error('Não foi possivel conectar o banco de dados')
    }
}
main()

app.use('/user', UserRouter)


app.get("/", (req, res)=>{
    res.send("ok")
})

export default app