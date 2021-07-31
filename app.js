import express from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import { localsMiddleware } from './middlewares';
import routes from './routes';
import { globalRouter } from './routers/globalRouter';

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: { maxAge: 60000 }, //세션1분으로 
        store:MongoStore.create({ mongoUrl: process.env.DB_URL})
    })
);

app.set("view engine", "pug");
app.use(localsMiddleware);
app.use(express.static("img"));
app.use("/frontend", express.static("clients"));
app.use(express.urlencoded({ extended: true}));
app.use(morgan("dev"));
app.use(express.json());
//Routers
app.use(routes.home, globalRouter);

export default app;