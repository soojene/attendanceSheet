import express from "express";
import { deleteMember, getAddMember, getHome, getSaved, getSearch, postAddMember, postHome, PostSaved, PostSearch } from '../Controllers/homeController';
import { getJoin, getLogin, logout, postJoin, postLogin } from '../Controllers/publicController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from '../routes';

export const globalRouter = express.Router();

//public
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin);

//social login

//private
globalRouter.get(routes.home, onlyPrivate, getHome);
globalRouter.post(routes.home, onlyPrivate, postHome);
globalRouter.get(routes.add, onlyPrivate, getAddMember);
globalRouter.post(routes.add, onlyPrivate, postAddMember);
globalRouter.get(routes.search, onlyPrivate, getSearch);
globalRouter.post(routes.search, onlyPrivate, PostSearch);
globalRouter.get(routes.saved, onlyPrivate, getSaved);
globalRouter.post(routes.saved, onlyPrivate, PostSaved);

//no template
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.deleteMember(), onlyPrivate, deleteMember);

