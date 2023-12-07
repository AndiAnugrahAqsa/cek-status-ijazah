import express from "express"
import path from 'path';
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import routes from "./routes/index.js";
import config from "./helpers/config.js";
import morgan from "morgan";
import setUpDB from "./models/generateTable.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

setUpDB()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');

routes(app)
dotenv.config()

app.listen(config.PORT, ()=>{
    console.log('server is running')
})
