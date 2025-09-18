import path from 'path';
import {Home} from '../models/home.model.js';

export const getUserHome = (req, res) => {
  Home.fetchAll()
    .then(([homes]) => {
      Home.getFavourites()
        .then(([favourites]) => {
          res.render("user/dashboard", { homes, favourites });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};




export const getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([home])=>{
 res.render("user/home-detail", { home });
  })
}


export const getReserve = (req, res) => {
  res.render("user/reserve");
}


export const addFavouriteList = (req, res) => {
  const { homeId } = req.params;
  Home.saveFavourites(homeId).then(({success})=>{
if(success){
    console.log("Home ID add to favourites:");
    
    res.json({success:true, isFavourite:1})
    }
    else{
    Home.removeFavourites(homeId)
    res.json({success:true, isFavourite:0})
    }
  }) 
    
    
  
 
}

export const getFavouriteList = (req, res) => {
  Home.getFavourites().then(([favourites])=>{
    console.log(favourites)
res.render("user/favourite-list", { favourites });
  })
    
  
    
}


export const getBookings = (req, res) => {
  res.render("user/bookings");
}