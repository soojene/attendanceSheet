import express from "express";
import { deleteMember, getAddMember, getHome, getJoin, getLogin, getSaved, getSearch, logout, postAddMember, postHome, postJoin, postLogin, PostSaved, PostSearch } from '../Controllers/homeController';
import routes from '../routes';

export const globalRouter = express.Router();

//public
globalRouter.route(routes.login).get(getLogin).post(postLogin);
globalRouter.route(routes.join).get(getJoin).post(postJoin);

//social login

//private
globalRouter.route(routes.home).get(getHome).post(postHome);
globalRouter.route(routes.add).get(getAddMember).post(postAddMember);
globalRouter.route(routes.search).get(getSearch).post(PostSearch);
globalRouter.route(routes.saved).get(getSaved).post(PostSaved);

//no template
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.deleteMember, deleteMember);

