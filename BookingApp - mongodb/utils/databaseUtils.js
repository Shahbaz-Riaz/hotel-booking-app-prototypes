import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'

dotenv.config()

const client = new MongoClient(process.env.DB_URL)
const dbName = 'airbnb'
let db;


export const connectDb = async () => {
  try {
    await client.connect()
    console.log('✅ Connected successfully to MongoDB Atlas')
     db = client.db(dbName)
    return db
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }

}


export const getDb = () => {
  if(!db) {
    throw new Error('Database not connected')
  } 
  return db
}


