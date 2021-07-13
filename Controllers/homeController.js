import { fakeDB } from '../fakeData';

//LOGIN AND JOINm
export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "LOGIN"});
};
export const postLogin = (req, res) => {
    res.redirect("home");
};

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "JOIN"});
};

export const postJoin = (req, res) => {
    res.redirect("login");
};

//MAIN PAGES
export const getHome = async(req, res) => {
    const {query: { day: dayOf }} = req;
    console.log(dayOf);
    if(dayOf){
        const members = fakeDB.filter(member => member.dayOfweek === dayOf);
        return res.render("home", {pageTitle: "Home", members });
    } 
    const members = fakeDB.filter(member => member.dayOfweek === "SAT");
        res.render("home", {pageTitle: "Home", members });
        console.log(members);
};

export const postHome = (req, res) => {
    const members = fakeDB.filter(member => member.dayOfweek === "SAT");
    res.render("home", {pageTitle: "Home", members });
};

export const addMember = (req, res) => {
    res.render("addmember", {pageTitle: "AddMember" });
};

export const getSaved = (req, res) => {
    res.render("saved", {pageTitle: "Saved" });
};
export const PostSaved = (req, res) => {
    console.log("post save page");
    res.render("saved", {pageTitle: "Saved" });
};

export const getSearch = async (req, res) => {
    const {
        query: { name:searchingPeople } 
    } = req;
    let findpeople = fakeDB.find((person) => person.name === searchingPeople);
    
    res.render("search", {pageTitle: "Search", findpeople });
    
};
export const PostSearch = async (req, res) => {
    res.redirect("search");
};

//LOGOUT
export const logout = (req, res) => {
    res.redirect("login");
};