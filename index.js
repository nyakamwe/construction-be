const express = require('express')
require('dotenv').config();
const cors = require('cors')
const DB = require('./models');
const userRoutes = require('./routes/UserRoutes')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is up and running on http://localhost:${port}`)
    console.log('ctrl + c to stop the server')
})

const {sequelize} = DB;
sequelize
    .authenticate()
    .then(() => {
        console.log('DB CONNECTED...');
    })
    .catch((err) => {
        console.log('Unable to connect to the database: ', err);
});