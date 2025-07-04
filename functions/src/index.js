import express from "express";
import indexRouter from "./routes.js";
import path, { dirname } from "path"; // directory for folder on any machine
import { fileURLToPath } from "url";
import cors from "cors";
const app = express();
const allowedOrigins = [
    "https://alpinejs-7e917.firebaseapp.com",
    "https://alpinejs-7e917.web.app"
];


const __dirname = dirname(fileURLToPath(import.meta.url));                  //get the path fo

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS' + origin),false);
        }
    }
}));                                             
app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.json());                                                   
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'../../public/index.html'))); 
app.use('/api',indexRouter);   

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
