import path from "path";

import { Home } from "../models/home.model.js";

export const getHome = (req, res) => {
  Home.fetchAll().then((homes) => {
    res.render("host/host-home", { homes });
  });
};

export const addHome = (req, res, next) => {

  res.render("host/editHome", { pageTitle: "add Home", home: null });
};

export const registerHome = (req, res, next) => {
  const { homeName, description, price } = req.body;
  const imagePath = "/uploads/" + req.file.filename;
  const home = new Home(homeName, description, price, imagePath);

home.save()
  .then(() => {
    res.render("host/registeredHome");
  })
  .catch(err => {
    console.log(err);
    res.status(500).send("Error saving home");
  });

};


export const getEditHome = (req, res, next) => {
  const editMode = req.query.editing === "true";
  const homeId = req.params.homeId;
  if (!editMode) {
    return res.redirect("/host");
  }
  Home.findById(homeId).then((home)=>{
 res.render("host/editHome", {
      editing: editMode,
      homeId: homeId,
      pageTitle: "Edit Home",
      home: home,
    });
  })
    
};


export const editHome = (req, res, next) => {
  console.log("Editing home...");
  const homeId = req.body.homeId.trim();
  const {  homeName, description, price } = req.body;
  const imagePath = req.file ? "/uploads/" + req.file.filename  : req.body.existingImagePath;
  console.log(homeId, homeName, description, price, imagePath);
  const updatedHome = new Home(homeName, description, price, imagePath);
  updatedHome.update(homeId).then(()=>{
 res.redirect("/host");
  })
  .catch((err)=>{
    console.log("error in update",err)
  })
  
 
};

export const deleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then((deleted)=>{
    if (deleted) {
      console.log("Home deleted successfully");
    }
    res.redirect("/host");
  })
  .catch((err)=>{
console.log(err,"error in deleting home...")
  })
};
