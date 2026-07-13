require('dotenv').config();
const express= require('express');
const cors=require('cors');
const connectDB=require('./config/db');
const  authRoutes=require('./routes/authRoutes');


const  app=express();

//connect to  mongoDB
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

//test route
app.get('/api/health',(req,res)=>{
    res.json({status:"server is running"});

});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
     console.log(`Server running on port ${PORT}`);
});
