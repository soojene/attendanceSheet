import express from "express";
import { addMember, getHome, getJoin, getLogin, getSearch, join, logout, postHome, postJoin, postLogin, PostSearch, saved } from '../Controllers/homeController';
import routes from '../routes';

export const globalRouter = express.Router();

//public
globalRouter.route(routes.login).get(getLogin).post(postLogin);
globalRouter.route(routes.join).get(getJoin).post(postJoin);

//private
globalRouter.route(routes.home).get(getHome).post(postHome);
globalRouter.get(routes.add, addMember);
globalRouter.route(routes.search).get(getSearch).post(PostSearch);
globalRouter.get(routes.saved, saved);

globalRouter.get(routes.logout, logout);