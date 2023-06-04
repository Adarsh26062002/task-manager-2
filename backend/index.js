const express = require('express');
require('./db');
const todoRoutes = require('./Routes/todoRoutes');
const signup = require('./Routes/signUp');
const signin = require('./Routes/signIn');
const cors = require('cors');
// connectDB(); // Call the connectDB function to connect to the database

const app = express();

// Other server configuration and routes
app.use(cors());
app.use(express.json());
app.use(signup);
app.use(signin);
app.use(todoRoutes) ;
app.use(cors({
    origin: 'http://localhost:3000'
  }));
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With,Content-type,Accept"
//     );
//     next();
// })




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
