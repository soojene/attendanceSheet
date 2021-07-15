// import { loginUser } from './Controllers/publicController';
import routes from './routes';

export const localsMiddleware = (req, res, next) => {
    // console.log(req.session);
    res.locals.siteName = "NOODASIM";
    res.locals.routes = routes;
    res.locals.logInUser= req.session.loggedInUser;
    next(); 
};

export const onlyPublic = (req, res, next) => {
    if (res.locals.logInUser) {
        res.redirect(routes.home);
    } else {  
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (res.locals.logInUser) {
        next();
    } else {
        res.redirect(routes.login);
    }
};