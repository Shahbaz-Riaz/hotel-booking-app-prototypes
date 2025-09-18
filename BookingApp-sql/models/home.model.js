import db from "../utils/databaseUtils.js";

export class Home {
  constructor(homeName, description, price, imagePath) {
    this.homeName = homeName;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
  }

  save() {
    return db.execute(
      `INSERT INTO homes (homeName, description, price, imagePath, isFavourite)
     VALUES (?, ?, ?, ?, 0)`,
      [this.homeName, this.description, this.price, this.imagePath]
    );
  }

  update(id) {
    return db.execute(
      `UPDATE homes 
     SET homeName = ?, price = ?, description = ?, imagePath = ?
     WHERE id = ?`,
      [this.homeName, this.price, this.description, this.imagePath, id]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(id) {
    return db.execute(`SELECT * FROM homes WHERE id=?`, [id]);
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM homes WHERE id = ?`, [id]);
  }

 static saveFavourites(homeId) {
  return Home.findById(homeId).then(([home]) => {
    if (!home || home.length === 0) {
      throw new Error("Home not found");
    }

    if (home[0].isFavourite === 1) {
      console.log(`Home with ID ${homeId} removed from favourite`);
      return { success: false, message: "Already favourite" };
    } else {
      return db.execute(
        `UPDATE homes SET isFavourite = 1 WHERE id = ?`,
        [homeId]
      ).then(() => {
        return  { success: true, message: "Marked as favourite" };
      });
    }
  });
}



  static removeFavourites(homeId) {
    return Home.findById(homeId).then((home)=>{
      return db.execute(`
          UPDATE homes 
      SET isFavourite = 0
      WHERE id = ?`,[homeId]).then(()=>{
        return {success:true , message: "Removed From Favourite"}
      });
   
    })
    // Home.fetchAll((existingHomes) => {
    //   const home = existingHomes.find((home) => home.id === homeId);
    //   if (home) {
    //     home.isFavourite = false; // remove from favourites

    //     fs.writeFile(filePath, JSON.stringify(existingHomes), (err) => {
    //       if (err) {
    //         console.log("Error writing file:", err);
    //         return callback({ success: false, message: "Error updating file" });
    //       }
    //       console.log(`Home with ID ${homeId} removed from favourites.`);
    //       return callback({ success: true, isFavourite: false });
    //     });
    //   } else {
    //     return callback({ success: false, message: "Home not found" });
    //   }
    // });
  }

  static getFavourites() {
    return db.execute("SELECT * FROM homes WHERE isFavourite = 1");
  }
}
