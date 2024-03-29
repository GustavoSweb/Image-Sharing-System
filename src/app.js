import dotenv from 'dotenv'
dotenv.config()

import express  from "express";
const app = express()
import mongoose from "mongoose";
import UserRouter from './routers/User.js';

app.use(express.urlencoded({extended:false}))
app.use(express.json()) 

async function main(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        throw new Error('Não foi possivel conectar o banco de dados')
    }
}
main()

app.use('/', UserRouter)


app.get("/", (req, res)=>{
    res.send("ok")
})

export default app