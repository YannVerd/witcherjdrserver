import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './db/connect.js'
import { ObjectId } from 'mongodb';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });



const db = await connect();

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/characters", async (req, res)=>{
    try {
        let datas = await db.collection("characters").find().toArray();
        res.json(datas);
    }catch(e){
        console.error('fail get characters', e)
        res.send({message: "failed to get characters"})
    }
})
app.post("/character", async (req, res)=>{
    console.log(req.body)
    try {
        if(!req.body._id){
            let id ="";
            await db.collection("characters").insertOne(req.body)
                .then(result => {
                        id = result.insertedId;      
                });
            res.status(200).send({message: "character saved", _id: id});
        } else {
            let dto = {}
            for(let key in req.body){
                if(key != "_id"){
                    dto[key] = req.body[key]
                }
            }
            await db.collection("characters").replaceOne({_id: ObjectId.createFromHexString(req.body._id)}, dto)
            .then(res => console.log(res));
            res.status(200).send({message: "character replace"});
        } 
    } catch (error) {
        console.error("fail to insert/update character", error)
        res.send({message: "error in the request"})
    }
})

app.listen(3000, () => {  console.log("Serveur prêt")})

