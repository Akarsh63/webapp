const mongoose=require('mongoose')
const express=require('express')
const cors = require('cors')
const dotenv=require('dotenv')
const routess =require('./routes/route')
dotenv.config()
const app =express();
app.use(express.json());
const corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

app.get("/",((req,res)=>{
    res.send("Server is running!");
}))

app.use('/api',routess);
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const PORT = 8080
app.listen(PORT,()=> console.log(`Server is running at port : ${PORT}`))
