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
export const getHome = (req, res) => {
    res.render("home", {pageTitle: "Home" });
};

export const postHome = (req, res) => {
    res.render("home", {pageTitle: "Home" });
};

export const addMember = (req, res) => {
    res.render("addmember", {pageTitle: "AddMember" });
};

export const saved = (req, res) => {
    res.render("saved", {pageTitle: "Saved" });
};

export const getSearch = async (req, res) => {
    const {
        query: { name:searchingPeople } 
    } = req;
    let findpeople = await fakeDB.find((person) => person.name === searchingPeople);
    
    console.log(findpeople);
    
    res.render("search", {pageTitle: "Search", findpeople });
    
};
export const PostSearch = async (req, res) => {
    res.redirect("search");
};

//LOGOUT
export const logout = (req, res) => {
    res.redirect("login");
};