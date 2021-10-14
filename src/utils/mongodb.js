require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const addMapping = async (botName, probability) => {
    let client;

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true});  
      const db = client.db(dbName);
  
      // Insert a single document
      await db.collection(collectionName).insertOne({botName, probability});
    } catch (err) {
      console.log(err.stack);
    }
  
    // Close connection
    client.close();
};

// assumes search query returns true
const updateMapping = async(botName, probability) => {
    let client;

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true});  
      const db = client.db(dbName);
  
      // Update a single document
      await db.collection(collectionName).updateOne({botName}, {botName, probability});
    } catch (err) {
      console.log(err.stack);
    }
  
    // Close connection
    client.close();
}

const searchMapping = async(botName) => {
    let client;
    let finding;

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true});  
      const db = client.db(dbName);
  
      // Searches for a document
      finding = await db.collection(collectionName).find({botName}).limit(1).toArray();
    } catch (err) {
      console.log(err.stack);
    }
  
    // Close connection
    client.close();
    return finding;
}

// assumes search query returns false
const removeMapping = async(botName) => {
    let client;

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true});  
      const db = client.db(dbName);
  
      // Remove a single document
      await db.collection(collectionName).deleteOne({botName});
    } catch (err) {
      console.log(err.stack);
    }
  
    // Close connection
    client.close();
}

module.exports = {
    addMapping,
    updateMapping,
    searchMapping,
    removeMapping
}