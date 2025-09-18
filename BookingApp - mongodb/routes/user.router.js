
import express from 'express';
import { getUserHome, getHomeDetails, getReserve, getFavouriteList, addFavouriteList, getBookings } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getUserHome);
userRouter.get('/home-list', getUserHome);
userRouter.get('/homes/:homeId', getHomeDetails);
userRouter.get('/reserve', getReserve);
userRouter.post('/favourite/:homeId', addFavouriteList);
userRouter.get('/favourite-list', getFavouriteList);;
userRouter.get('/bookings', getBookings);




export default userRouter;