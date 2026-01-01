const express = require("express");
const { hello, addUser, readAllUers, updateUserWithID, deleteUserWithID } = require("../Controller/Controller");
const router = express.Router();

router.get("/hello",hello)
router.post("/addUser",addUser)
router.get("/readAllUser",readAllUers)
router.put("/updateUser/:id",updateUserWithID)
router.delete("/deleteUser/:id",deleteUserWithID)

module.exports=router;