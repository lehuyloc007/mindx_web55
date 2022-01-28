const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findByUserName, insertUser } = require("../database/user")

const login = async (username, password) => {
    //find user by username
    const existedUser = await findByUserName(username);
    console.log(existedUser)
    if(!existedUser) {
        throw new Error("Username is not existed!")
    }
    // verify password
    if(!verifyPassword(password, existedUser)) {
        throw new Error("Password not correct")
    }
    //generate JWT
    const token = jwt.sign({
        userId: existedUser._id
    }, "MY_PRIiVATE_KEY", {
        expiresIn: 60*60
    })
    return {
        existedUser: existedUser,
        tocken: token
    }
}
const register = async (username, password, email) => {
    // chech username is exsted
    const existedUser = await findByUserName(username);
    if(existedUser) {
        throw new Error("Username is existed!")
    }
    // encrypt the password
    const { salt, hashedPassword } = encryptPassword(password);
    const insertedUser = await insertUser({
        username: username,
        email: email,
        salt: salt,
        hashedPassword: hashedPassword
    });
    return insertedUser
}
const encryptPassword = (password) => {
    //private key for singer user
    const salt = crypto.randomBytes(128).toString("hex");
    //hashed password
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000 , 64, 'sha512').toString("hex");
    return {
        salt: salt,
        hashedPassword: hashedPassword
    }
}
const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString("hex");
    console.log(password);
    console.log(user.password);

    return hashedPassword == user.hashedPassword;
}
module.exports = { login, register }