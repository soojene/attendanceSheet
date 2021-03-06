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
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "๐ฝ ๋ค์ด๋ฒ ๊ฐํธ ๋ก๊ทธ์ธ์ ์ด์ฉํ์ธ์."});
    }
    const findUser = await UserDB.findOne({ email, socialOnly: false });
    if(!findUser){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "๐ฅ ๊ฐ์๋์ง ์์ ์ด๋ฉ์ผ์๋๋ค."});
    }
    const ok = await bcrypt.compare(password, findUser.password);
    if (!ok){
        return res.status(404).render("login", {pageTitle:"LOGIN", ErrorMessage: "๐ฐ ํ๋ฆฐ ๋น๋ฒ์๋๋ค."});
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
    //์ด๋ฉ์ผ์ด ์ ํํ์ง ํ์ธํ๊ณ ,
    //๋ธ๋ผ์ฐ์ ๊ฐ join์ธ์์ด ์ ์๋์์๋ statusCode400๋ฒ๋ ์ฃผ๊ณ 
    //joinํ ๋ ๊ธฐ์ฌํ ์ด๋ฉ์ผ๊ฐ์ ธ์์ ๋ก๊ทธ์ธํ๋ฉด์ผ๋ก redirect ํด์ฃผ๋ฉด์ 
    // ๋ก๊ทธ์ธ ์ธํ๊ฐ์ ๋ฃ์ด์ฃผ์ด์ ๋ค์ ํ์ํ์ง ์๊ฒ ํด์ฃผ๊ณ  
    const { email, password1, password2} = req.body;
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const validateEmail = re.test(email);
        
    if(validateEmail === false){
        return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "โ๏ธ ์ฌ๋ฐ๋ฅธ ์ด๋ฉ์ผ์ ์ ์ด์ฃผ์ธ์"});
    }
    if(password1 !== password2){
        return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "โ๏ธ ๋น๋ฒ์ด ์ผ์นํ์ง ์์์."});
    }
    try {
        const emailTaken = await UserDB.exists({ email });
        if (emailTaken){
            return res.status(404).render("join", {pageTitle:"JOIN", ErrorMessage: "โ๏ธ ์ด๋ฏธ ์ฌ์ฉ์ค์ธ ์ด๋ฉ์ผ์๋๋ค."});
        }else{
            await UserDB.create({
                email,
                password: password1
            });
            return res.render("login", {pageTitle:"LOGIN", ErrorMessage: "๊ฐ์์ ์ถํํฉ๋๋ค!"});
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