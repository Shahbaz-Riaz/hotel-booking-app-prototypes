import { ObjectId } from 'mongodb';
import { getDb } from '../utils/databaseUtils.js';


export class Home {
  constructor(homeName, description, price, imagePath, _id) {
    this.homeName = homeName;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
    if(_id){
      this._id = _id
    }
  }

  save() {
    const db = getDb()
    return db.collection('homes').insertOne(this)

  }

  update(id) {
    const db = getDb()
    return db.collection('homes').updateOne({_id: new ObjectId(String(id))}, {$set: this})
  }

  static fetchAll() {
    const db = getDb()
    return db.collection('homes').find().toArray()
  }

  static findById(id) {
    const db = getDb()
    return db.collection('homes').find({_id: new ObjectId(String(id))}).next()
  }

  static deleteById(id) {
    const db = getDb()
    return db.collection('homes').deleteOne({_id: new ObjectId(String(id))})
  }

 static saveFavourites(homeId) {
  const db = getDb()
  return db.collection('favourites').findOne({homeId: new ObjectId(String(homeId))}).then((favourite)=>{
    if(favourite){
      return {success:false}
    }
    else{
      return db.collection('favourites').insertOne({homeId: new ObjectId(String(homeId))}).then(()=>{
        return {success:true}
      })
    }
}
  )
 }





  static removeFavourites(homeId) {
    const db = getDb()
    return db.collection('favourites').deleteOne({homeId: new ObjectId(String(homeId))})
  }

  static getFavourites() {
    const db = getDb()
    return db.collection('favourites').aggregate([
      {
        $lookup: {
          from: 'homes',
          localField: 'homeId',
          foreignField: '_id',  
          as: 'homeDetails'
        }
      }]).toArray()
  }





}
