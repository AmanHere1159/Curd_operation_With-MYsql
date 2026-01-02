const db = require("../DB/DB"); // database connection

const createUser = async (userData) => {
  // defining query statement
  const query = `INSERT INTO rewardpoints (userID, pointsEarned,
     pointsRedeemed, transactionDate) VALUES (?,?,?,?)`;
  const values = [userID, pointsEarned, pointsRedeemed, transactionDate];
  try {
    // saving the result as a array
    const [result] = await db.query(query, values);
    // console.log(`the reslt value in service is ${result}`)
    console.log(result.affectedRows);
    return result.affectedRows > 0;
  } catch (error) {
    console.log(`this is catch error ${error}`);
    return false;
  }
};

const getAllUser = async (id) => {
   try {
    const query = `SELECT *FROM rewardpoints`;
    const [result] = await db.query(query);
    if (result.length > 0) {
      return result;
    }
  } catch (error) {
    console.log(`this is catch error ${error}`);
    return false;
  }
};

const updateUser = async (dataToSend) => {
  try {
    const {id,pointsEarned,pointsRedeemed, transactionDate} = dataToSend;
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardID=?`;
    const result = await db.query(chekerQuery, [dataToSend.id]);
    console.log("printing the value if result", result);
    // if user exists with the provided ID only than the update user will work
    if (result.length > 0) {
      //    *********** Actual updating with rewardID *************
      const query = `UPDATE rewardpoints SET pointsEarned=?,pointsRedeemed=?,
   transactionDate=? WHERE rewardID=?`;
      const value = [pointsEarned, pointsRedeemed, transactionDate, id];
      const [updateResult] = await db.query(query, value);
      if (updateResult.affectedRows > 0) {
        return 1;
      }
      return 0;

      // ********* updating finish *********
    } else {
      return 404;
    }
  } catch (error) {
    console.log(error);
    return 401;
  }
};

const deleteUser = async (idToSend) => {
  try {
    const id = idToSend.id
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardID=?`;
    const result = await db.query(chekerQuery, [id]);
    console.log("printing the value if result", result);
    // if user exists with the provided ID only than the update user will work
    if (result.length > 0) {
      //    *********** Actual updating with rewardID *************
      const query = `DELETE FROM rewardpoints WHERE rewardID=? `;
      const [updateResult] = await db.query(query, [id]);
      if (updateResult.affectedRows > 0) {
        return 1;
      }
      return 0;

      // ********* updating finish *********
    } else {
      return 404;
    }
  } catch (error) {
    console.log(error);
    return 401;
  }
};

const dataAccess = { createUser, getAllUser, updateUser, deleteUser };
module.exports = dataAccess;
