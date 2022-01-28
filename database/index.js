const { MongoClient } = require("mongodb");
const db = {};
const connectToDb = async () => {
    const mongodbClient = new MongoClient("mongodb://localhost:27017")
    await mongodbClient.connect();
    console.log("db connected")
    const database = mongodbClient.db("mindx_web55");
    db.students = database.collection("students");
    db.teachers = database.collection("teachers");
    db.users = database.collection("users");
}
module.exports = { db, connectToDb}