import express from "express";
import { createItemListBuy } from "./http/routes/create-item";
import { putNameItem, putStatusItem } from "./http/routes/put-endpoints";
import { getItemsPagination } from "./http/routes/get-items";
import { deleteItem } from "./http/routes/delete-item";
import { loginUser } from "./http/routes/authUser/login-user";

import { createUser } from "./http/routes/create-user";
import { AuthMiddlewares } from "./middlewares/auth";
import { refreshToken } from "./http/routes/authUser/refreshToken";

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/listbuys", AuthMiddlewares, getItemsPagination);
app.post("/listbuy", AuthMiddlewares, createItemListBuy);
app.post("/login", loginUser);
app.post("/register", createUser);
app.post("/refresh", refreshToken)
app.put("/listbuy/comprado/:id", AuthMiddlewares, putStatusItem);
app.put("/listbuy/name/:id", AuthMiddlewares, putNameItem);
app.delete("/listbuy/:id", AuthMiddlewares, deleteItem);

app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080`)
);
