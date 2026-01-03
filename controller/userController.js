const serviceLayer = require("../services/userServices");

// createUser
exports.createUsers = async (req, res) => {
  try {
    const { userId, pointsEarned, pointsRedeemed, transactionDate } = req.body;
    const dataToSend = {
      userId,
      pointsEarned,
      pointsRedeemed,
      transactionDate,
    };
    const result = await serviceLayer.createUser(dataToSend);
    console.log(`the controller result ${result}`);
    if (result === 200) {
      return res.status(200).json({
        status: "ok",
        code: "200",
        message: "Created user succesfully",
        details: "Successfully created",
      });
    } else if (result === 403) {
      res.status(403).json({
        status: "ERROR.",
        code: "403",
        message: "Bad request.Fields not found",
        details: `Request body must contain "userId","pointsEarned","pointsRedeemed" and "transactionDate" `,
      });
    } else if (result === 401) {
      res.status(401).json({
        status: "error",
        code: "401",
        message: "Something went wrong .Please try again later",
        details: `Internal server error`,
      });
    } else if (result === 404) {
      res.status(404).json({
        status: "ERROR",
        code: "404",
        message: "userId does not exists",
        details: "The provided userId is not registered",
      });
    } else {
      return res.status(501).json({
        status: "error",
        code: "501",
        message: "Something went wrong .Please try again later",
        details: `Internal server error`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "500",
      message: "Something went wrong .Please try again later",
      details: `Internal server error`,
    });
  }
};
// read All users from rewardpoints
exports.readAllUers = async (req, res) => {
  try {
    const result = await serviceLayer.readAllUser();

    if (result === 404) {
      res.status(404).json({
        status: "ERROR",
        code: "404",
        message: "Error retrieving data",
        details: `Please try again later`,
      });
    } else if (result === 500) {
      res.status(500).json({
        status: "ERROR.",
        code: "500",
        message: "Something went wrong.Please try again later",
        details: `Internal server error`,
      });
    } else if (result) {
      return res.status(200).json({
        status: "OK",
        code: "200",
        message: "Fetched data successfully",
        Users: result,
      });
    } else {
      return res.status(500).json({
        status: "ERROR",
        code: "500",
        message: "Something went wrong.Please try again later",
        details: `Internal server error`,
      });
    }
  } catch (error) {
    console.log(`Inside readAllUser in userController ERROR:${error}`);
    return res.status(501).json({
      status: "ERROR",
      code: "501",
      message: "Something went wrong.Please try again later",
      details: `Internal server error`,
    });
  }
};
// updateUser with ID (here id refers to rewardId)
exports.handleUpdate = async (req, res) => {
  try {
    const { url } = req;
    const id = url.split("/").pop();
    const { pointsEarned, pointsRedeemed, transactionDate } = req.body;
    const dataToSend = { id, pointsEarned, pointsRedeemed, transactionDate };
    const result = await serviceLayer.updateUserWithID(dataToSend);

    if (result === 1) {
      res.status(200).json({
        status: "OK",
        code: "200",
        message: "Credentials successfully updated.",
      });
    } else if (result === 0) {
      res.status(400).json({
        status: "ERROR.",
        code: "400",
        message: "Something went wrong. Please try again.",
      });
    } else if (result === 404) {
      res.status(404).json({
        status: "ERROR",
        code: "404",
        message: "Sorry, you are not registered",
      });
    } else if (result === 403) {
      res.status(403).json({
        status: "ERROR",
        code: "403",
        message: "rewardId not found",
        details: "URL does not contain rewardId",
      });
    } else {
      res.status(500).json({
        status: "ERROR.",
        code: "500",
        message: "Internal server error",
        details: "Something went wrong. Please try again later",
      });
    }
  } catch (error) {
    console.log(`Inside handleUpdate in userController ERROR:${error}`);
    res.status(501).json({
      status: "ERROR",
      code: "501",
      message: "Something went wrong. Please try again later",
      details: "Internal server error",
    });
  }
};
// deleteUser with ID
exports.handleDelete = async (req, res) => {
  try {
    const { url } = req;
    const id = url.split("/").pop();
    const idToSend = { id };
    const result = await serviceLayer.deleteUserWithID(idToSend);

    if (result === 1) {
      res.status(200).json({
        status: "OK",
        code: "200",
        message: "User deleted successfully",
      });
    } else if (result === 0) {
      res.status(400).json({
        status: "ERROR",
        code: "400",
        message: "Bad request.",
        details:
          "Something went wrong.Please try again later",
      });
    } else if (result === 404) {
      res.status(404).json({
        status: "ERROR",
        code: "404",
        message: "Sorry, you are not registered.",
        details: "No user exists with the provided ID",
      });
    } else if (result === 403) {
      res.status(403).json({
        status: "ERROR",
        code: "403",
        message: "rewardId not found",
        details: "URL does not contain rewardID",
      });
    } else {
      res.status(501).json({
        status: "ERROR",
        code: "500",
        message: "Please try again later",
        details: "Internal server error",
      });
    }
  } catch (error) {
    console.log(`Inside handleDelete in userController ERROR:${error}`);
    res.status(500).json({
      status: "ERROR",
      code: "500",
      message: "Please try again later",
      details: "Internal server error",
    });
  }
};
