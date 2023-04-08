const express = require("express");
const routes = express.Router();
//const authMiddleware = require("../src/middleware/auth.middleware");

// Controllers
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");

// User routes
routes.post("/register", UserController.register);
routes.get("/lojainfo/:user_id", UserController.lojainfo);
routes.post("/login", UserController.login);
routes.put("/editarPerfil/:user_id", UserController.editarPerfil);
routes.post("/validateemail", UserController.validateEmail);

// Product routes
routes.post("/addProduct", ProductController.addProduct);
routes.get("/getProduct/:product_id", ProductController.getProduct);
routes.post("/getAllProducts/:user_id", ProductController.getAllProducts);
routes.get(
  "/getOthersProducts/:user_id/:product_id",
  ProductController.getOthersProducts
);
routes.put("/editProduct/:product_id", ProductController.editProduct);
routes.delete("/deleteProduct/:product_id", ProductController.deleteProduct);

module.exports = routes;
