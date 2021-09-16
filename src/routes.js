//public
const LOGIN = "/login";
const JOIN = "/join";
//socialLogin
const STARTNAVER = "/gonaver";
const FINISHNAVER = "/comefromnaver";

//private
const HOME = "/soo-attendance.herokuapp.com";
const SAVED = "/saved";
const ADD = "/addmember";
const SEARCH = "/search";
const DELETEMEMBER = "/delete:id";
const LOGOUT = "/logout";
//routes for datas
const RESET = "/reset:id";
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
    reset:(id)=>{
        if(id){
            return `/reset${id}`;
        }else{
            return RESET;
        }
    },
    recordtime:SAVETIME
};

export default routes;