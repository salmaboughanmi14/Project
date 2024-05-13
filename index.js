const express = require('express'); 
const dotenv = require('dotenv').config(); 
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();


mongoose.connect('mongodb+srv://admin:t88G3N58yedt1h3R@mernapp.titwtjb.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp')
.then(() => console.log('Data Base Connected'))
.catch((err) => console.log('Data Base Not Connected', err))


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = 8000; 
app.listen(port, () => console.log(`Server is running on port ${port}`))