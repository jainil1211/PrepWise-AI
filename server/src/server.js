require('dotenv').config();
const express= require('express');
const cors=require('cors');
const connectDB=require('./config/db');
const  authRoutes=require('./routes/authRoutes');
const  resumeRoutes=require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const errorHandler = require('./middleware/errorMiddleware');


const  app=express();

//connect to  mongoDB
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/resume',resumeRoutes);
app.use('/api/interview', interviewRoutes);




//test route
app.get('/api/health',(req,res)=>{
    res.json({status:"server is running"});
    
});


// Error handler MUST be the very last app.use() call
app.use(errorHandler);


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
     console.log(`Server running on port ${PORT}`);
});
