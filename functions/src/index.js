import express from "express";
import indexRouter from "./routes.js";
import path, { dirname } from "path"; // directory for folder on any machine
import { fileURLToPath } from "url";
import functions from "firebase-functions";
import cors from 'cors';
const app = express();


const __dirname = dirname(fileURLToPath(import.meta.url));                  //get the path fo

app.use(cors());                                             
app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.json());                                                   
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'../../public/index.html'))); 
app.use('/api',indexRouter);   

//export const api = functions.https.onRequest(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req,res) => {
  console.log(`Server running on http://localhost:${PORT}`)});