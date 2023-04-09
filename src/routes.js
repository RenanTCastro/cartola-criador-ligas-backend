const express = require("express");
const routes = express.Router();
const authMiddleware = require("../src/middleware/auth.middleware");

// Controllers
const UserController = require("./controllers/UserController");
const LeagueController = require("./controllers/LeagueController");

// User routes
routes.post("/login", UserController.login);
routes.post("/register", UserController.register);
routes.post("/resetPassword/:user_id", UserController.resetPassword);
routes.get("/getInfo/:user_id", UserController.getInfo);
routes.delete("/deleteUser/:user_id", UserController.deleteUser);

// Product routes
// routes.post("/createLeague", LeagueController.createLeague);
// routes.get("/getLeague/:product_id", LeagueController.getLeague);
// routes.post("/getAllLeagues/:user_id", LeagueController.getAllLeagues);
// routes.put("/editLeague/:product_id", LeagueController.editLeague);
// routes.delete("/deleteProduct/:product_id", LeagueController.deleteProduct);

module.exports = routes;
