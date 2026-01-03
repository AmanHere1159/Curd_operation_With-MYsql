const dataAccessLayer = require("../dataAccessLayer/userDataAccessLayer");
// create single user
const createUser = async (dataToSend) => {
  if (
    !dataToSend.userId ||
    !dataToSend.pointsEarned ||
    !dataToSend.pointsRedeemed
  ) {
     return 403;
  }
  return await dataAccessLayer.createUser(dataToSend);
};
// read All users
const readAllUser = async () => {
  return await dataAccessLayer.getAllUser();
};
// update user with id
const updateUserWithID = async (dataToSend) => {
  if (!dataToSend.id) {
    return 403;
  }
  return await dataAccessLayer.updateUser(dataToSend)

 
};
// delete user with ID 
const deleteUserWithID = async (idToSend) => {
  if (!idToSend) {
    return 403;
  }
  return await dataAccessLayer.deleteUser(idToSend);
};
serviceLayer = { createUser, readAllUser, updateUserWithID, deleteUserWithID };
module.exports = serviceLayer;
