import express from 'express';
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './routes/index'
import connectDb from './config/connectDb'
import cors from 'cors';
require('dotenv').config();

let port = process.env.PORT || 8000;
let app = express();

app.use(cors({origin : true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app);

initWebRoutes(app);
connectDb();
app.listen(port, ()=> {
    console.log('back end nodejs is running on : '+ port)
});