//public
const LOGIN = "/login";
const JOIN = "/join";
//socialLogin
const STARTNAVER = "/gonaver";
const FINISHNAVER = "/comefromnaver";

//private
const HOME = "/";
const SAVED = "/saved";
const ADD = "/addmember";
const SEARCH = "/search";
const DELETEMEMBER = "/delete:id";
const LOGOUT = "/logout";
//routes for datas
const RESET = "/reset";
const SAVETIME = "/recordtime";

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
    finishNaver:FINISHNAVER,
    reset:RESET,
    recordtime:SAVETIME
};

export default routes;