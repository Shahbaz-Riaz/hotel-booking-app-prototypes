import path from "path";

import { Home } from "../models/home.model.js";

export const getHome = (req, res) => {
  //  res.sendFile(path.join(path.resolve(), 'views', 'host-home.html'));
  Home.fetchAll((homes) => {
    res.render("host/host-home", { homes });
  });
};

export const addHome = (req, res, next) => {
  // res.sendFile(path.join(path.resolve("views/addHome.html")));
  
  res.render("host/editHome",{pageTitle: "add Home", home: null});
};

export const registerHome = (req, res, next) => {
  const { homeName, description, price } = req.body;
  const imagePath = "/uploads/" + req.file.filename;
  const home = new Home(homeName, description, price, imagePath);

  home.save((dataAdded) => {
    if (!dataAdded) {
      return res.send({ message: "Home already exists!" });
    }

    // Only render after home is successfully added
    res.render("host/registeredHome");
  });
};


export const getEditHome = (req, res, next) => {
  const editMode = req.query.editing === 'true';
  const homeId = req.params.homeId;
  if (!editMode) {
    return res.redirect('/host');
  }
  Home.findById(homeId, home => {
    if (!home){
      console.log("Home not found");
      return res.redirect('/host');
    }
    console.log(home);
    res.render('host/editHome', {editing: editMode, homeId: homeId, pageTitle: "Edit Home", home: home} );
}
  );
};


export const editHome = (req, res, next) => {
  console.log("Editing home...");
  const { homeId, homeName, description, price } = req.body;
  const imagePath = req.file ? "/uploads/" + req.file.filename : req.body.existingImagePath;
  console.log(homeId, homeName, description, price, imagePath);
  const updatedHome = new Home(homeName, description, price, imagePath);
  updatedHome.id = String(homeId).trim();

  updatedHome.save((dataAdded) => {
    if (!dataAdded) {
      return res.send({ message: "Home already exists!" });
    }
    res.redirect('/host');
  }

  );


}


export const deleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId, (deleted) => {
    if (deleted) {
      console.log("Home deleted successfully");
    }
    res.redirect('/host');
  }
  );
};