import path from 'path'
import express from 'express';
import { addHome, getHome, registerHome, getEditHome, editHome, deleteHome } from '../controllers/homes.controller.js';
import upload from '../utils/multer.js';


const hostRouter = express.Router();





hostRouter.get('/', getHome);

hostRouter.get('/add-home',addHome);

hostRouter.post('/register-home',upload.single('image'), registerHome);

hostRouter.get('/edit-home/:homeId', getEditHome);

hostRouter.post('/edit-home', upload.single('image'), editHome);

hostRouter.post('/delete-home/:homeId', deleteHome);




export default hostRouter;