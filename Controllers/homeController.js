import { fakeDB } from '../fakeData';
import routes from '../routes';
import MemberDB from '../models/Member';

//login 만들고 수정
export let loginUser = false;

//LOGIN AND JOIN 로그인되고 다른 루트로 접근 가능하게 해야함.
export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "LOGIN"});
};
export const postLogin = (req, res) => {
    //로그인하면 유저를 이메일로 찾고, 
    //패스워드가 일치하면 로그인 시켜주고 
    //세션을 주고, 유저를 세션이 담고 홈으로 access
    loginUser = true;
    res.redirect(routes.home);
};

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "JOIN"});
};

export const postJoin = (req, res) => {
    //패스워드 일치하는지 확인해주고,
    //이메일이 정확한지 확인하고,
    //폼을 가져와서 유저 생성해주고,
    //브라우저가 join인식이 잘 안되었을때 statusCode400번때 주고
    //join할때 기재한 이메일가져와서 로그인화면으로 redirect 해주면서 
    // 로그인 인풋값에 넣어주어서 다시 타입하지 않게 해주고 
    res.redirect(routes.login);
};

//MAIN PAGES
let selectedDay = "SAT";
export const getHome = async(req, res) => {
    //로그인이 안되어있으면 로그인으로 redirect해놓고 있으면 홈을 렌더링.
    const {query: { day: selectDay }} = req;
    if (selectDay !== undefined){
        selectedDay = selectDay;    
    }
    try{
        const members = await MemberDB.find({ dayOfWeek: selectedDay });
        // console.log(members);
        return res.render("home", {pageTitle: "HOME", members});
    }catch(error){
        console.log("HOME error:", error);
        return res.redirect(routes.home);
    }
};

export const postHome = (req, res) => {
    const members = fakeDB.filter(member => member.dayOfweek === "SAT");
    res.render("home", {pageTitle: "Home", members });
};

export const getAddMember = (req, res) => {
    
    res.render("addmember", {pageTitle: "AddMember" });
};

export const postAddMember = async (req, res) => {
    //맴버추가하는 폼을 받아와서 새로운 맴버를 만들어서 홈으로 redirect해줌
    const { name, email, dayOfWeek, nthMeeting, entryFee, createdBy } = req.body;
    try {
        const member = await MemberDB.create({
            name,
            email,
            createdBy,
            entryFee,
            nthMeeting,
            numberOfAbsence: 0,
            earnedMoney: 0,
            dayOfWeek
        });
        console.log(member);
        res.redirect(routes.home);
    } catch (error) {
        console.log("add Error:", error);
        return res.redirect(routes.home);
    }
};

let selectedDayChart = "SAT";
export const getSaved = async (req, res) => {
    //요일별로 찾아서 디스플레이
    const {query: { day: selectDay }} = req;
    if (selectDay !== undefined){
        selectedDayChart = selectDay;    
    }
    try{
        const members = await MemberDB.find({ dayOfWeek: selectedDayChart });
        return res.render("saved", {pageTitle: "CART", members});
    }catch(error){
        console.log("HOME error:", error);
        return res.redirect(routes.saved);
    }
};
export const PostSaved = (req, res) => {
    //10회 종료후 리셋 처리 or 밴드와 공유하는 버튼 생성
    console.log("post save page");
    res.render("saved", {pageTitle: "Saved" });
};

export const getSearch = async (req, res) => {
    const {
        query: { name:searchingPeople } 
    } = req;
    if(searchingPeople == undefined){
        return res.render("search", {pageTitle: "SEARCH" });
    }
    try {
        //name: {$reget: new RegExp(인풋값의이름, "i")},
        let findMember = await MemberDB.find({ name: searchingPeople });
        if(findMember.length === 0){
            console.log("empty");
            return res.render("search", {pageTitle: "SEARCH" });
        } else {
            console.log(findMember);
            return res.render("search", {pageTitle: "SEARCH", findMember });
        }
    } catch(error){
        console.log("search error:", error);
        return res.redirect(routes.search);
    }
    
};

export const PostSearch = async (req, res) => {
    //찾아서 수정해서 저장해준다. post방식은 req.body로 검색
    console.log(req.body.memberName); 
    res.redirect(routes.search);
};

export const deleteMember = (req, res) => {
    console.log(req.params); 
    res.redirect(routes.search);
}

//LOGOUT

export const logout = (req, res) => {
    //세션을 destroy해야 함
    loginUser = false;
    res.redirect("login");
};