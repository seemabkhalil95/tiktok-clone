import express from'express';
import mongoose from 'mongoose';
import cors from'cors';
import Data from'./data.js';
import Vidoes from './vidoesModel.js'
const app = express();
app.use(cors());

// Port
const port = process.env.PORT || 8001;
// Mongo connection url
const connection_url ='mongodb+srv://admin:zSTwy5fnLs2jqzw6@cluster0.pjz7m.mongodb.net/tiktok?retryWrites=true&w=majority';
// DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send("Hello World!!!")
});
app.get('/v1/posts', (req, res) => {
    res.status(200).send(Data)
});
// Data pushing
app.post('/v2/posts',(req,res)=>{
    const dbVidoes = req.body;
    Vidoes.create(dbVidoes,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
// Download Data
app.get('/v2/posts',(req,res)=>{
    Vidoes.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
