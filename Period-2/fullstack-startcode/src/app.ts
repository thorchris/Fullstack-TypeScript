import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

//TODO: Decide for which one to use below
import friendsRoutes from "./routes/friendRoutesAuth";
//import friendsRoutes from "./routes/friendRoutes";

const debug = require("debug")("app")
import {Request, Response, NextFunction} from "express"
import { ApiError } from "./errors/apiError";
//import simpleLogger from "./middelware/simpleLogger";


const app = express();
app.use(express.json())

//Winston-Morgan Logger 
import logger, { stream } from "./middleware/logger";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
app.use(require("morgan")(morganFormat, { stream }));
app.set("logger", logger) 

//Logger, uncomment to see console logs
//app.use(simpleLogger)

//Enables all CORS
var cors = require('cors')
app.use(cors())

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/friends", friendsRoutes);

app.get("/demo", (req, res) => {
  res.send("Server is up");
});

import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';

import authMiddleware from "./middleware/basic-auth"
app.use("/graphql", authMiddleware)

app.use("/graphql", (req, res, next) => {
  const body = req.body;
  if (body && body.query && body.query.includes("createFriend")) {
    console.log("Create")
    return next();
  }
  if (body && body.operationName && body.query.includes("IntrospectionQuery")) {
    return next();
  }
  if (body.query && (body.mutation || body.query)) {
    return authMiddleware(req, res, next)
  }
  next()
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

//Error handling - When none of the other calls return a response - 404 for api requests
app.use("/api",(req, res, next) => {
    res.status(404).json({ errorCode:404, msg: "not found"})
})

//Makes JSON error-response for ApiErrors, otherwise pass on to default error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof (ApiError)) {
    res.status(err.errorCode).json({ errorCode: 404, msg: err.message })
  } else {
    next(err)
  }
})

export default app;



