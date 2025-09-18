import path from 'path'
import express from 'express'
import dotenv from 'dotenv'

import hostRouter from './routes/host.router.js'
import userRouter from './routes/user.router.js';
import { pageNotFound } from './controllers/errors.controller.js';


// import db from './utils/databaseUtils.js'
// db.execute(`SELECT * FROM homes WHERE id=${id}`)


const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dotenv.config()
const port = process.env.PORT || 3000


app.use('/', userRouter);
app.use('/host', hostRouter);
app.use('/user', userRouter);

app.use(pageNotFound);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
