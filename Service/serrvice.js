const dataAccess = require("../DataAccessLayer/DAL");
const db = require("../DB/DB");
// add single user
const addUser = async (dataToSend) => {
  if (
    !dataToSend.id ||
    !dataToSend.pointsEarned ||
    !dataToSend.pointsRedeemed
  ) {
    throw new Error("Invalid user data");
  }
  return await dataAccess.createUser(dataToSend);
};
// read All users
const readAllUser = async () => {
  return await dataAccess.getAllUser();
};
// update user with id
const updateUserWithID = async (dataToSend) => {
  if (!dataToSend.id) {
    throw new Error("must contain id Object");
  }
  return await dataAccess.updateUser(dataToSend)

 
};
// delete user with ID is working
const deleteUserWithID = async (idToSend) => {
  if (!idToSend) {
    throw new Error("must contain id Object");
  }
  return await dataAccess.deleteUser(idToSend);
};
serviceLayer = { addUser, readAllUser, updateUserWithID, deleteUserWithID };
module.exports = serviceLayer;
