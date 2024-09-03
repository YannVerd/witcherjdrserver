import express from 'express';
import cors from 'cors';
import path from 'path';

let __dirname = path.resolve();
const app = express();



app.use(cors());

app.get('/grimoire', (req, res)=> {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname+"/datas/grimoire.json")); 
})

app.get("/character", (req, res)=>{

})
app.post("/character", (req, res)=>{

})

app.listen(3000, () => {  console.log("Serveur prêt")})

