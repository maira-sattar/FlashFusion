import express, { urlencoded } from "express";
import "./databases/index";
import router from "./router/index";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { dataCollection, errorHandler } from "./middlewares";
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

export const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors(corsOptions));

app.use(express.json()); //for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(dataCollection);

// const ejsPath = path.join(__dirname, "views");
// app.set("view engine", "ejs");
// app.set("views", ejsPath);
app.use("/api", router);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("successfully listening on ", PORT);
});
