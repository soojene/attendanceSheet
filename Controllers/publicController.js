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
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "아래 네이버 로그인을 이용 하세여"});
    }
    const findUser = await UserDB.findOne({ email, socialOnly: false });
    if(!findUser){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "메일이 틀렸어요."});
    }
    const ok = await bcrypt.compare(password, findUser.password);
    if (!ok){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "롱패스워드"});
    }
    req.session.logIn = true;
    req.session.loggedInUser = findUser;
    req.session.day = "SAT";
    // console.log("postLogin:",req.session);
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
        return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "passwords are not match"});
    }
    try {
        const emailTaken = await UserDB.exists({ email });
        if (emailTaken){
            return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "This email is already used."});
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