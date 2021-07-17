//Global
const HOME = "/";
const ADD = "/addmember";
const SEARCH = "/search";
const SAVED = "/saved";


const LOGIN = "/login";
const LOGOUT = "/logout";
const JOIN = "/join";
const DELETEMEMBER = "/delete:id";

//socialLogin
const STARTNAVER = "/gonaver";
const FINISHNAVER = "/comefromnaver";


const routes = {
    home:HOME,
    add:ADD,
    search:SEARCH,
    saved:SAVED,
    join:JOIN,
    login:LOGIN,
    logout:LOGOUT,
    deleteMember:(id)=>{
        if(id){
            return `/delete${id}`;
        }else{
            return DELETEMEMBER;
        }
    },
    startNaver:STARTNAVER,
    finishNaver:FINISHNAVER
};

export default routes;