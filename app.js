import express, { Router } from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connection } from 'mongoose';
import morgan from 'morgan';
import { localsMiddleware } from './middlewares';
import { globalRouter } from './routers/globalRouter';
import routes from './routes';

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        Store:MongoStore.create({ mongoUrl: process.env.DB_URL})
    })
);
app.use(localsMiddleware);
// Middleware before Router
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true}));
app.use(morgan("dev"));

//Routers
app.use(routes.home, globalRouter);


export default app;