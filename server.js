const express = require("express")
const app = express()
const path = require('path')
const { logger } = require('./middlewares/logger')
const port = process.env.PORT || 3500
const errorHandler = require("./middlewares/ErrorHandler")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
let {connectDB} = require('./DB/connectDB')
const userRoutes = require('./routes/userRoutes')
const notesRoutes = require('./routes/notesRoutes')

app.use(logger)


app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())


app.use('/' , require('./routes/root'))


app.use(errorHandler)
app.use('/users' , userRoutes)
app.use('/users' , notesRoutes)

app.all('*' , (req,res)=>{
    if(req.accepts('html'))
        {
            res.sendFile(path.join(__dirname , 'views' , 'Error404.html'))
        }
        else if( req.accepts('json'))
            {
                res.json({message : "its an 404 error"})
            }
        else{
            res.type('txt').send('404 Not Found')
        }
})

app.listen(port ,async ()=>{
   await connectDB(process.env.DB_URI)
    console.log(process.env.NODE_ENV);
    console.log('Server is Running in port 3500');
})