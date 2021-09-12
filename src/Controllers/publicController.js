import UserDB from '../models/Leader';
import routes from '../routes';
import bcrypt from 'bcrypt';
import MemberDB from '../models/Member';

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
    req.session.startTime = findUser.timeStart;
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
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const validateEmail = re.test(email);
        
    if(validateEmail === false){
        return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "⛔️ 올바른 이메일을 적어주세요"});
    }
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
            return res.render("login", {pageTitle:"LOGIN", ErrorMessage: "가입을 축하합니다!"});
        }
    } catch (error){
        console.log("ERROR:", error);
        return res.redirect(routes.join);
    }
};

//NO TEMPLATE
export const logout = async (req, res) => {
    try{
        const leader = await UserDB.findById(req.session.loggedInUser._id);
        leader.timeStart = req.session.startTime;
        leader.save();
    }catch(err){
        console.log(err);
        return res.redirect("login");
    }
    req.session.logIn = false;
    req.session.destroy();
    return res.redirect("login");
};