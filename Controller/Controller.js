exports.hello = async (req, res) => {
  res.status(201).send(JSON.stringify({ Message: "Hello from my side" }));
};
// addUser
exports.addUser = async (req, res) => {
  try {
    const db = req.db;
    const { userID, pointsEarned, pointsRedeemed, transactionDate } = req.body;
    // defining query statement
    const query = `INSERT INTO rewardpoints (userID, pointsEarned,
     pointsRedeemed, transactionDate) VALUES (?,?,?,?)`;
    //  inserting data in database
    db.query(
      query,
      [userID, pointsEarned, pointsRedeemed, transactionDate],
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User added successfully", result });
      }
    );
  } catch (error) {
    console.log(`this is ${error}`);
    res.status(400).send("Server error=>", error);
  }
};
// read All users from rewardpoints
exports.readAllUers = async (req, res) => {
  try {
    const db = req.db;
    const query = `SELECT *FROM rewardpoints`;
    db.query(query, (error, result) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(400).send("this is error", error);
  }
};
// updateUser with ID
exports.updateUserWithID = async (req, res) => {
  try {
    const db = req.db;
    const { url } = req;
    const id = url.split("/").pop();
    const { pointsEarned, pointsRedeemed, transactionDate } = req.body;
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardID=?`;
    
    db.query(chekerQuery, [id], (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    //   console.log(`result is `,json(result))
      // if rewardID length is 0 means empty table
      if (result.length === 0) {
        return res.status(404).send("user not found");
      }
      const query = `UPDATE rewardpoints SET pointsEarned=?,pointsRedeemed=?,
   transactionDate=? WHERE rewardID=? `;
      //    *********** Actual updating with rewardID *************
      db.query(
        query,
        [pointsEarned, pointsRedeemed, transactionDate, id],
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          res.json({ message: "Record updated successfully"});
        }
      );
      // ********* updating finish *********
    });
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
    const chekerQuery = `SELECT *FROM rewardpoints WHERE rewardID=?`;
    
    db.query(chekerQuery, [id], (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    //   console.log(`result is `,json(result))
      // if rewardID length is 0 means empty table
      if (result.length === 0) {
        return res.status(404).send("user not found");
      }
      const query = `DELETE FROM rewardpoints WHERE rewardID=? `;
      //    *********** Actual updating with rewardID *************
      db.query(
        query,
        [id],
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          res.json({ message: "User deleted successfully",UserID:id});
        }
      );
      // ********* updating finish *********
    });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(400).send("this is error", error);
  }
};
