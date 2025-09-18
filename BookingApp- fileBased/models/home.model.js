import path from "path";
import fs from "fs";

const filePath = path.join(path.resolve(), "data", "homes.json");

export class Home {
  constructor(homeName, description, price, imagePath) {
    this.homeName = homeName;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
  }

  save(callback) {
    Home.fetchAll((existingHomes) => {
      // Check for duplicate home names
      const duplicate = existingHomes.find(
        (home) => home.homeName === this.homeName && home.id !== this.id
      );
      if (duplicate) {
        console.log(duplicate);
        console.log("Home with this name already exists.");
        return callback(false);
      }

      if (this.id) {
        // Update existing home
        existingHomes = existingHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        this.id = Date.now().toString();
        existingHomes.push(this);
        this.isFavourite = false; // Default value for new homes
      }

      fs.writeFile(filePath, JSON.stringify(existingHomes), (err) => {
        if (err) {
          console.log("Error writing file:", err);
          return callback(false);
        }
        callback(true);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading file:", err);
        return callback([]);
      }

      try {
        const parsedData = data ? JSON.parse(data) : [];
        callback(parsedData);
      } catch (error) {
        console.log("Error parsing JSON:", error);
        callback([]);
      }
    });
  }

  static findById(id, callback) {
    Home.fetchAll((homes) => {
      const home = homes.find((home) => home.id === id);
      if (home) {
        callback(home);
      } else {
        callback(null);
      }
    });
  }

  static saveFavourites(homeId, callback) {
    Home.fetchAll((existingHomes) => {
      const home = existingHomes.find((home) => home.id === homeId);
      if (home) {
        if (home.isFavourite) {
          console.log(`Home with ID ${homeId} is already a favourite.`);
          return callback({
            success: false,
            message: "Home already in favourites",
          });
        }
        home.isFavourite = true; // Example property to mark as favourite
        fs.writeFile(filePath, JSON.stringify(existingHomes), (err) => {
          if (err) {
            console.log("Error writing file:", err);
            return callback({ success: false, message: "Error updating file" });
          }
          console.log(`Home with ID ${homeId} added to favourites.`);
          return callback({ success: true, isFavourite: true });
        });
      }
    });
  }

  static removeFavourites(homeId, callback) {
    Home.fetchAll((existingHomes) => {
      const home = existingHomes.find((home) => home.id === homeId);
      if (home) {
        home.isFavourite = false; // remove from favourites

        fs.writeFile(filePath, JSON.stringify(existingHomes), (err) => {
          if (err) {
            console.log("Error writing file:", err);
            return callback({ success: false, message: "Error updating file" });
          }
          console.log(`Home with ID ${homeId} removed from favourites.`);
          return callback({ success: true, isFavourite: false });
        });
      } else {
        return callback({ success: false, message: "Home not found" });
      }
    });
  }

  static getFavourites(callback) {
    Home.fetchAll((existingHomes) => {
      const favouriteHomes = existingHomes.filter((home) => home.isFavourite);
      if (!favouriteHomes) {
        return callback([]);
      }
      callback(favouriteHomes);
    });
  }

  static deleteById(id, callback) {
    Home.fetchAll((existingHomes) => {
      const updatedHomes = existingHomes.filter((home) => home.id !== id);

      fs.writeFile(filePath, JSON.stringify(updatedHomes), (err) => {
        if (err) {
          console.log("Error writing file:", err);
          callback(false); // notify failure
        } else {
          callback(true); // notify success
        }
      });
    });
  }
}
