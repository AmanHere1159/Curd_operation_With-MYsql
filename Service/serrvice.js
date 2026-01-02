const db = require("../DB/DB");
// add single user
exports.ServiceaddUser = async ({
  userID,
  pointsEarned,
  pointsRedeemed,
  transactionDate,
}) => {
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
// read All users
exports.ServicereadAllUser = async () => {
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
// update user with id
exports.ServiceupdateUserWithID = async ({
  id,
  pointsEarned,
  pointsRedeemed,
  transactionDate,
}) => {
  try {
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardID=?`;
    const result = await db.query(chekerQuery, [id]);
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
// delete user with ID
exports.ServicedeleteUserWithID = async ({ id }) => {
  try {
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
