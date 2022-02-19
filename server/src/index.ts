import express from "express";
import { controllersFactory } from "./controllers";
import { routeFactory } from "./routes";
require("dotenv").config();
require("./config/database").connect();

const app: express.Application = express();
const port = process.env.API_PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization,token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,PATCH,GET");
    return res.status(200).json({});
  }
  next();
});

const controllers = controllersFactory();
const siteRouter = routeFactory(controllers);
app.use("/api", siteRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
