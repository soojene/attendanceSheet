import routes from '../routes';
import fetch from 'node-fetch';
import UserDB from '../models/Leader';

export const startNaverLogin = (req, res) => {
    const baseUrl = "https://nid.naver.com/oauth2.0/authorize";
    const config = {
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: "http://localhost:5000/comefromnaver",
        state: process.env.STATE
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    res.redirect(finalUrl);
};

export const finishNaverLogin = async (req, res) => {
    const baseUrl = "https://nid.naver.com/oauth2.0/token";
    if(req.query.error){
        console.log("네이버 인증 요청이 실패, 에러메서지:", req.query.error_description);
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "소셜로그인이 실행되지 않았습니다. 일반 로그인하세여"});
    }
    const config = {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        state: req.query.state
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    try {
        const requestToken = await ( await fetch(finalUrl, {
            // method: "POST",
            headers: {
                'X-Naver-Client-Id': process.env.CLIENT_ID, 
                'X-Naver-Client-Secret': process.env.CLIENT_SECRET
            }
        })).json();
        const { access_token } = requestToken;
        const apiUrl = "https://openapi.naver.com/v1/nid/me";
        const userProfile = await ( await fetch(apiUrl,{
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).json();
        const {email, name} = userProfile.response;
        const existUser = await UserDB.findOne({ email });
        if(existUser){
            // console.log("이미 가입된 메일이 있음요");
            req.session.logIn = true;
            req.session.loggedInUser = existUser;
            req.session.startTime = existUser.timeStart;
            return res.redirect(routes.home);
        } else {
            // console.log("가입시켜~~~");
            const newUser = await UserDB.create({
                name,
                email,
                socialOnly: true,
                password: ""
            });
            req.session.logIn = true;
            req.session.loggedInUser = newUser;
            req.session.startTime = newUser.timeStart;
            // const days = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
            // const Oneday = new Date().getDay()
            // req.session.day = days[Oneday];
            // console.log(req.session.day);
            return res.redirect(routes.home);
        }
    } catch(error){
        console.log("토큰에러",error);
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "소셜로그인 실패"});
    }
    // if("access_token" in requestToken){
    //     //만약 소셜로그인시 이름과 메일이 동의되지 않으면 되돌려 보내야함. 
    // } else {
    //     console.log("토큰없다.");
    //     return res.redirect(routes.login);
    // }
};
