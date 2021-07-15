import UserDB from '../models/Leader';
import routes from '../routes';
import bcrypt from 'bcrypt';

//login하면 세션 로컬에 저장해서 수정
// export let loginUser = false;

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle: "LOGIN"});
};

export const postLogin = async (req, res) => {
    //로그인하면 유저를 이메일로 찾고, 
    //패스워드가 일치하면 로그인 시켜주고 
    //세션을 주고, 유저를 세션이 담고 홈으로 access
    const {email, password} = req.body;
    const findUser = await UserDB.findOne({ email });
    if(!findUser){
        return res.status(400).render("login", {pageTitle:"LOGIN", ErrorMessage: "틀린메일주소입네다."});
    }
    const ok = await bcrypt.compare(password, findUser.password);
    if (!ok){
        return res.status(400).render("login", {pageTitle:"LOGIN", ErrorMessage: "Wrong password"});
    }
    // loginUser = true;
    req.session.loggedInUser = findUser;
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
    const { name, email, password1, password2} = req.body;
    if(password1 !== password2){
        return res.status(400).render("join", {pageTitle:"JOIN", ErrorMessage: "passwords are not match"});
    }
    try {
        const emailTaken = await UserDB.exists({ email });
        const nameTaken = await UserDB.exists({ name });
        if (emailTaken){
            return res.status(400).render("join", {pageTitle:"JOIN", ErrorMessage: "This email is already used."});
        }else if(nameTaken){
            return res.status(400).render("join", {pageTitle:"JOIN", ErrorMessage: "This nickname is already taken."});
        }else{
            await UserDB.create({
                name,
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
    //세션을 destroy해야 함
    req.session.destroy();
    // loginUser = false;
    res.redirect("login");
};