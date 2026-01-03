const express = require("express");
const {
  createUsers,
  readAllUers,
  handleUpdate,
  handleDelete,
} = require("../controller/userController");

const router = express.Router();

/**
 * @swagger
 * /Users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               pointsEarned:
 *                 type: integer
 *                 example: 100
 *               pointsRedeemed:
 *                 type: integer
 *                 example: 20
 *               transactionDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK."
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Created user successfully."
 *                 detail:
 *                   type: string
 *                   example: "Successfully created."
 *       403:
 *         description: Bad request. Fields not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Bad request.Fields not found."
 *                 details:
 *                   type: string
 *                   example: "Request body must contain all fields "
 *       401:
 *         description: Unauthorized request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Something went wrong .Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 *       404:
 *         description: userId does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "userId does not exists"
 *                 details:
 *                   type: string
 *                   example: "The provided userId is not registered"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong .Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 *       501:
 *         description: Not implemented.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 501
 *                 message:
 *                   type: string
 *                   example: "Something went wrong .Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/Users", createUsers);
/**
 * @swagger
 * /Users:
 *   get:
 *     summary: Retrieve all reward points
 *     description: Returns an object containing a list of all reward point entries.
 *     responses:
 *       200:
 *         description: A list of reward points was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Fetched data successfully."
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/rewardpoints'
 *       404:
 *         description: Database is empty.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Error retrieving data"
 *                 details:
 *                   type: string
 *                   example: "Please try again later"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong.Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 *       501:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 501
 *                 message:
 *                   type: string
 *                   example: "Something went wrong.Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/Users", readAllUers);

/**
 * @swagger
 * /Users/{id}:
 *   put:
 *     summary: Update user information by rewardId
 *     description: Updates the credentials of a user identified by their rewardId.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/rewardpoints'
 *     responses:
 *       200:
 *         description: Credentials updated successfully .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK."
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Credentials successfully updated."
 *       400:
 *         description: Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Something went wrong.Please try again later"
 *       403:
 *         description: rewardId not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "rewardId not found"
 *                 details:
 *                   type: string
 *                   example: "URL does not contain rewardId"
 *       404:
 *         description: Sorry, you are not registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Sorry, you are not registered"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong. Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 *       501:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 501
 *                 message:
 *                   type: string
 *                   example: "Something went wrong. Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 */

router.put("/Users/:id", handleUpdate);

/**
 * @swagger
 * /Users/{id}:
 *   delete:
 *     summary: Delete a user by rewardId
 *     description: Removes a user from the system identified by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK."
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully ."
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Bad request."
 *                 details:
 *                   type: string
 *                   example: "Something went wrong.Please try again later"
 *       403:
 *         description: rewardId not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "rewardId not found"
 *                 details:
 *                   type: string
 *                   example: "URL does not contain rewardID"
 *       404:
 *         description: Sorry, you are not registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Sorry, you are not registered."
 *                 details:
 *                   type: string
 *                   example: "No user exists with the provided ID"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 *       501:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR."
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Please try again later"
 *                 details:
 *                   type: string
 *                   example: "Internal server error"
 */

router.delete("/Users/:id", handleDelete);

module.exports = router;
