import path from 'path';
import {Home} from '../models/home.model.js';

export const getUserHome = (req, res) => {
  Home.fetchAll((homes) => {
    Home.getFavourites((favourites) => {

    res.render("user/dashboard", { homes, favourites});
    })

  });
};

export const getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    res.render("user/home-detail", { home });
  });  
}


export const getReserve = (req, res) => {
  res.render("user/reserve");
}


export const addFavouriteList = (req, res) => {
  const { homeId } = req.params;
  Home.saveFavourites(homeId,(callbackData) => {
    if(callbackData.success){
    console.log("Home ID add to favourites:");
    return res.json(callbackData);
    }
    Home.removeFavourites(homeId,(callbackData) => {
      if(callbackData.success){
        console.log("Home ID removed from favourites:");
        return res.json(callbackData);
      }else{
        return res.json(callbackData);
      }
    });
  });
  
 
}

export const getFavouriteList = (req, res) => {
  Home.getFavourites((favourites) => {
    res.render("user/favourite-list", { favourites });
    console.log(favourites)
  });
    
}


export const getBookings = (req, res) => {
  res.render("user/bookings");
}