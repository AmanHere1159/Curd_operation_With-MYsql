const db = require("../database/userDatabase"); // database connection
// create user
const createUser = async (dataToSend) => {
  try {
    // to check if user exists with the given userId
    const chekerQuery = `SELECT *FROM users WHERE userId=?`;
    const [checkerResult] = await db.query(chekerQuery, [dataToSend.userId]);
    // if userId exists in userInfo only than its allowed to create user in rewardpoints
    if (checkerResult.length > 0) {
      const { userId, pointsEarned, pointsRedeemed, transactionDate } =
        dataToSend;
      const query = `INSERT INTO rewardpoints (userId, pointsEarned,
     pointsRedeemed, transactionDate) VALUES (?,?,?,?)`;
      const values = [userId, pointsEarned, pointsRedeemed, transactionDate];

      // saving the result as a array
      const [result] = await db.query(query, values);
      if (result.affectedRows > 0) {
        return 200;
      }
      return 401;
    }
    // else 404 means not registered in userInfo table
    else {
      return 404;
    }
  } catch (error) {
    console.log("Inside createUser in DataAccessLayer ERROR:",error);
    return 501;
  }
};
// read all users
const getAllUser = async (id) => {
  try {
    const query = `SELECT *FROM rewardpoints`;
    const [result] = await db.query(query);
    if (result.length > 0) {
      return result;
    }
    return 404;
  } catch (error) {
    console.log(`Inside getAllUser Data Access Layer ERROR:${error}`);
    return 500;
  }
};
// update user in database (id refers to rewardId)
const updateUser = async (dataToSend) => {
  try {
    const { id, pointsEarned, pointsRedeemed, transactionDate } = dataToSend;
    // to check if user exists with the given Id
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardId=?`;
    const result = await db.query(chekerQuery, [dataToSend.id]);
    // if user exists with the provided ID only than the update user will work
    if (result.length > 0) {
      //    *********** Actual updating with rewardID *************
      const query = `UPDATE rewardpoints SET pointsEarned=?,pointsRedeemed=?,
   transactionDate=? WHERE rewardId=?`;
      const value = [pointsEarned, pointsRedeemed, transactionDate, id];
      const [updateResult] = await db.query(query, value);
      if (updateResult.affectedRows > 0) {
        return 1; // return 1 if changes are made in rows
      }
      return 0; //return 0 if no changes made

      // ********* updating finish *********
    }
    return 404; //return 404 if user does not exists
  } catch (error) {
    console.log("Inside updateUser in Data Access Layer ERROR:",error);
    return 500; // return 500 if any error occurs updating user
  }
};
// delete user from datavase
const deleteUser = async (idToSend) => {
  try {
    const id = idToSend.id;
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardId=?`;
    const result = await db.query(chekerQuery, [id]);
    // if user exists with the provided ID only than the update user will work
    if (result.length > 0) {
      //    *********** Actual updating with rewardID *************
      const query = `DELETE FROM rewardpoints WHERE rewardId=? `;
      const [updateResult] = await db.query(query, [id]);
      if (updateResult.affectedRows > 0) {
        return 1; // return 1 if user deleted successfully
      }
      return 0; // return 0 if user not deleted

      // ********* updating finish *********
    }
    return 404; // return 404 if user does not exists
  } catch (error) {
    console.log("Inside deleteUser in Data Access Layer ERROR:",error);
    return 501; //return 501 if any occurs deleting user
  }
};

const dataAccessLayer = { createUser, getAllUser, updateUser, deleteUser };
module.exports = dataAccessLayer;
