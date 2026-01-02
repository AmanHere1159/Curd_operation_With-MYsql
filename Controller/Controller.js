const { ServiceaddUser, ServicereadAllUser, ServiceupdateUserWithID, some, ServicedeleteUserWithID } = require("../Service/serrvice");

exports.hello = async (req, res) => {
  res.status(201).send(JSON.stringify({ Message: "Hello from my side" }));
};
// addUser
exports.addUser = async (req, res) => {
  try {
    const { userID, pointsEarned, pointsRedeemed, transactionDate } = req.body;
    const result = await ServiceaddUser({
      userID,
      pointsEarned,
      pointsRedeemed,
      transactionDate,
    });
    console.log(`the controller result ${result}`);
    if (result) {
      return res.status(200).json({ message: "user added succesfully" });
    } else {
      return res.status(400).json({ message: "couldn't add user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// read All users from rewardpoints
exports.readAllUers = async (req, res) => {
  try {
    const result = await ServicereadAllUser();
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ message: "couldn't display all users" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
// updateUser with ID
exports.updateUserWithID = async (req, res) => {
  try {
    const { url } = req;
    const id = url.split("/").pop();
    const { pointsEarned, pointsRedeemed, transactionDate } = req.body;
    // console.log(`id is ${id} 1->${pointsEarned} 2->${pointsRedeemed}`)
    const result = await ServiceupdateUserWithID({id,pointsEarned, pointsRedeemed, transactionDate});
     
    if(result===1){
       res.json({ message: "User updated successfully", RewardID: id });
     }
     else if(result===0){
       res.json({ message: "could not update user", RewardID: id });
     }
     else if(result===404){
       res.json({ message: "user does not exists!!!", RewardID: id });
     }
     else{
       res.json({ message: "inside catch error", RewardID: id });
     }

  } catch (error) {
    console.log(`error is ${error}`);
    res.status(400).send("this is error", error);
  }
};
// deleteUser with ID
exports.deleteUserWithID = async (req, res) => {
  try {
    const db = req.db;
    const { url } = req;
    const id = url.split("/").pop();
    const result = await ServicedeleteUserWithID({id});
     
    if(result===1){
       res.json({ message: "User deleted successfully", RewardID: id });
     }
     else if(result===0){
       res.json({ message: "could not delete user", RewardID: id });
     }
     else if(result===404){
       res.json({ message: "user does not exists!!!", RewardID: id });
     }
     else{
       res.json({ message: "internal error", RewardID: id });
     }
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(400).send("this is error", error);
  }
};
