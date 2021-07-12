import express, { Router } from "express";
import morgan from 'morgan';
import { globalRouter } from './routers/globalRouter';
import routes from './routes';

const app = express();

// Middleware before Router
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true}));
app.use(morgan("dev"));

//Routers
app.use(routes.home, globalRouter);


export default app;