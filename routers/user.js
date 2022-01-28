const express = require("express");
const UserCtrl = require("../controllers/userController");
const { authMdw, requireAdmin } = require("../middlewares/auth")
const router = express.Router();

router.get("/", authMdw, requireAdmin, async (req, res) => {
    try {
        const users = await UserCtrl.getUsers(req.user);
        res.status(200).json(users)
    }  catch (err) {
        res.status(403).send(err.message)
    }
    
})
module.exports = router;