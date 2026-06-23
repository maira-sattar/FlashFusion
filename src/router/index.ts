import path from "path";
import { user } from "../controller/user.controller";
import { category } from "../controller/category.controller";

import express from "express";
import { withAccess, withAuthentication } from "../middlewares/user.middleware";
import { products } from "../controller/product.controller";
import { home } from "../controller/home.controller";

// import { withAccess } from "../middlewares/User.middleware";

const router = express();

const ejsPath = path.join(__dirname, "../views");
router.set("view engine", "ejs");
router.set("views", ejsPath);
router.post("/signUp", user.signUp);
router.post("/logIn", user.logIn);
router.post("/forgotPassword", user.forgotPassword);
router.post("/resetPassword", user.resetPassword);
router.get("/verify/user/:email/:hash", user.verifyUser);
router.get("/get/category", category.getAllCat);
router.get("/products", products.getAllProduct);
router.get("/products/:id", products.getProDetails);
router.get("/web-home-page", home.getHomePage);
router.post("/web-home-page", home.createHomePage);
router.use(withAuthentication);

router.post("/update", user.update);
router.put("/updateUser", user.updateUser);
router.delete("/delete/:id", user.deleteAccount);
router.use(withAccess);
router.get("/users", user.getUsers);
router.put("/manageUser/:id", user.manageUser);

router.post("/add/category", category.addProdCat);

router.put("/update/category/:id", category.updateCat);
router.post("/add/product", products.addProduct);
router.put("/products/:id", products.updateProducts);
router.get("products/:id", products.delProducts);
router.post("/web-home-page", home.createHomePage);

export default router;
