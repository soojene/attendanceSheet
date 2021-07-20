import express from "express";
import { deleteMember, getAddMember, getHome, getSaved, getSearch, postAddMember, postEdit, postHome, PostSaved, PostSearch } from '../Controllers/homeController';
import { getJoin, getLogin, logout, postJoin, postLogin } from '../Controllers/publicController';
import { finishNaverLogin, startNaverLogin } from '../Controllers/socialLoginController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from '../routes';

export const globalRouter = express.Router();

//public
globalRouter.route(routes.login).all(onlyPublic).get(getLogin).post(postLogin);
globalRouter.route(routes.join).all(onlyPublic).get(getJoin).post(postJoin);


//social login
globalRouter.get(routes.startNaver, startNaverLogin);
globalRouter.get(routes.finishNaver, finishNaverLogin);

//private
globalRouter.route(routes.home).all(onlyPrivate).get(getHome).post(postHome);
globalRouter.route(routes.add).all(onlyPrivate).get(getAddMember).post(postAddMember);
globalRouter.route(routes.search).all(onlyPrivate).get(getSearch).post(postEdit);
globalRouter.route(routes.saved).all(onlyPrivate).get(getSaved).post(PostSaved);

//no template
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.deleteMember(), onlyPrivate, deleteMember);

