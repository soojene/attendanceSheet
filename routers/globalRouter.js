import express from "express";
import { getSearch, home, join, PostSearch, saved } from '../Controllers/homeController';
import routes from '../routes';

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.route(routes.search).get(getSearch).post(PostSearch);
globalRouter.get(routes.saved, saved);