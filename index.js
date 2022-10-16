const express = require('express')
require('dotenv').config();
const cors = require('cors')
const DB = require('./models');
const userRoutes = require('./routes/UserRoutes')
const projectRoutes = require('./routes/ProjectRoutes')
const enquiryRoutes = require('./routes/enquiryRoutes')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api', userRoutes);
app.use('/api', projectRoutes)
app.use("/api", enquiryRoutes)

app.listen(port, ()=>{
    console.log(`Server is up and running on http://localhost:${port}`)
    console.log('press Ctrl + C to stop the server')
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