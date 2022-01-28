const { db } = require("./");
const { ObjectId } = require("mongodb")
const findByUserName = async (username) => {
    const user = await db.users.findOne({ username: username});
    return user;
}

const findById = async (_id) => {
    const user = await db.users.findOne({_id: ObjectId(_id)});
    return user;
}

const insertUser = async (user) => {
    await db.users.insertOne(user);
    return user;
}

const findAllUsers = async () => {
    const user = await db.users.find({}).toArray();
    return user;
}

module.exports = { findByUserName, insertUser, findAllUsers, findById };