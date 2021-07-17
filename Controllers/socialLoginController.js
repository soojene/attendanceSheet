import routes from '../routes';
import fetch from 'node-fetch';

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
        //요청실패시 다시 소셜로그인 시도하던가, 그냥 로그인해야하는 메세지주자
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
    const requestToken = await ( await fetch(finalUrl, {
        // method: "POST",
        headers: {
            'X-Naver-Client-Id': process.env.CLIENT_ID, 
            'X-Naver-Client-Secret': process.env.CLIENT_SECRET
        }
    })).json();
    if("access_token" in requestToken){
        console.log("토큰이 있다");
        const { access_token } = requestToken;
        const apiUrl = "https://openapi.naver.com/v1/nid/me";
        const userProfile = await ( await fetch(apiUrl,{
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).json();
        console.log(userProfile);
        //메일을 검색해서 있는 메일이면 로그인 시키고, 없으면 회원가입시켜서 로그인해준다(socialOnly를 true로 해서 비번없이).
        //email 과 name을 사용할 수 있음
        //만약 소셜로그인시 이름과 메일이 동의되지 않으면 되돌려 보내야함. 
    } else {
        console.log("토큰없다.");
    }
    res.redirect(routes.login);
};
