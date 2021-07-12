import { fakeDB } from '../fakeData';

export const home = (req, res) => {
    res.render("home", {pageTitle: "Home" });
};

export const join = (req, res) => {
    res.render("join", {pageTitle: "Join" });
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

export const saved = (req, res) => {
    res.render("saved", {pageTitle: "Saved" });
};