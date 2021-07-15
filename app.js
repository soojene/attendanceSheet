import express, { Router } from "express";
import session from 'express-session';
import morgan from 'morgan';
import { localsMiddleware } from './middlewares';
import { globalRouter } from './routers/globalRouter';
import routes from './routes';

const app = express();

app.use(
    session({
        secret: "hello",
        resave: true,
        saveUninitialized: true
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