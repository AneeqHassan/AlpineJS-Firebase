import express from "express";
import indexRouter from "./routes/routes.js";
import path, { dirname } from "path";                                       // directory for folder on any machine
import { fileURLToPath } from "url";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));                  //get the path for the folder

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());                                                   //convert the parameters to json when using post
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'index.html'))); // at the root route / send the html file 
app.use('/api',indexRouter);                                                //middleware

app.listen(8080,console.log('Server  is listening on http://localhost:8080'));
