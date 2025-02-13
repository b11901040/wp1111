// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ server.js ]
// * PackageName  [ server ]
// * Synopsis     [ Connect to Database and Infrastructure of Backend ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
import { dataInit } from './upload'
require('dotenv').config()
const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

const port = process.env.PORT || 4000
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


if (!process.env.MONGO_URL) {
    console.error("missing MONGO_URL");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async res => {
    if (process.env.MODE === 'Reset') {
        console.log('Reset Mode: reset the data')
        dataInit()
    }
}).then((res) => console.log("mongo db connection created"))

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// TODO Part I-3: check DB connection

routes(app)
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
