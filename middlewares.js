import { selectedDay } from './Controllers/homeController';
import routes from './routes';

export const localsMiddleware = (req, res, next) => {
    // console.log(req.session);
    res.locals.siteName = "NOODASIM";
    res.locals.routes = routes;
    res.locals.logIn = Boolean(req.session.logIn);
    // res.locals.selectedDay = selectedDay;
    res.locals.loggedInUser= req.session.loggedInUser;
    next(); 
};

export const onlyPublic = (req, res, next) => {
    if (res.locals.logIn) {
        res.redirect(routes.home);
    } else {  
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (res.locals.logIn) {
        next();
    } else {
        res.redirect(routes.login);
    }
};