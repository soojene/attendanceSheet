import UserDB from '../models/Leader';
import routes from '../routes';
import bcrypt from 'bcrypt';

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle: "LOGIN"});
};

export const postLogin = async (req, res) => {
    const {email, password} = req.body;
    const socialUser = await UserDB.exists({ email, socialOnly: true });
    if (socialUser){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "🅽 네이버 간편 로그인을 이용하세요."});
    }
    const findUser = await UserDB.findOne({ email, socialOnly: false });
    if(!findUser){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "🥕 가입되지 않은 이메일입니다."});
    }
    const ok = await bcrypt.compare(password, findUser.password);
    if (!ok){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "🌰 틀린 비번입니다."});
    }
    req.session.logIn = true;
    req.session.loggedInUser = findUser;
    // const days = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
    // const today = new Date();
    // const Oneday = today.getDay()
    // req.session.day = days[Oneday];
    return res.redirect(routes.home);
};

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "JOIN"});
};

export const postJoin = async (req, res) => {
    //이메일이 정확한지 확인하고,
    //브라우저가 join인식이 잘 안되었을때 statusCode400번때 주고
    //join할때 기재한 이메일가져와서 로그인화면으로 redirect 해주면서 
    // 로그인 인풋값에 넣어주어서 다시 타입하지 않게 해주고 
    const { email, password1, password2} = req.body;
    if(password1 !== password2){
        return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "⛔️ 비번이 일치하지 않아요."});
    }
    try {
        const emailTaken = await UserDB.exists({ email });
        if (emailTaken){
            return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "⛔️ 이미 사용중인 이메일입니다."});
        }else{
            await UserDB.create({
                email,
                password: password1
            });
            return res.redirect(routes.login);
        }
    } catch (error){
        console.log("ERROR:", error);
        return res.redirect(routes.join);
    }
};

//NO TEMPLATE
export const logout = (req, res) => {
    req.session.logIn = false;
    req.session.destroy();
    res.redirect("login");
};