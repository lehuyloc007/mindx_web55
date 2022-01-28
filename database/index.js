const { MongoClient } = require("mongodb");
const db = {};
const connectToDb = async () => {
    const mongodbClient = new MongoClient("mongodb+srv://admin:admin123456@cluster0.vpqs1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    await mongodbClient.connect();
    console.log("db connected")
    const database = mongodbClient.db("mindx_web55");
    db.students = database.collection("students");
    db.teachers = database.collection("teachers");
    db.users = database.collection("users");
}
module.exports = { db, connectToDb}