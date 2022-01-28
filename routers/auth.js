const express = require("express");
const AuthCtrl = require("../controllers/authController")
const router = express.Router();

router.post("/login", async (req, res) =>{
    //validation
    //call logic
    try {
        const loggedUsers = await AuthCtrl.login(req.body.username, req.body.password);
        res.json(loggedUsers)
    } catch (err) {
        res.status(409).send(err.message)
    }
});
router.post("/register", async (req, res) =>{
    //validation
    if(!req.body.password || req.body.password.length < 6) {
        res.status.send("Password must contain at least 6 characters");
        return
    }
    //call logic
    try {
        const newUsers = await AuthCtrl.register(req.body.username, req.body.password, req.body.email);
        res.json(newUsers)
    } catch (err) {
        res.status(409).send(err.message)
    }
    
});

module.exports = router;