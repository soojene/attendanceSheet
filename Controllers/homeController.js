import routes from '../routes';
import MemberDB from '../models/Member';
import UserDB from '../models/Leader';

export const getHome = async(req, res) => {
    const createdBy = req.session.loggedInUser.email;
    try{
        const members = await MemberDB.find({createdBy});
        return res.render("home", {pageTitle: "HOME", members});
    }catch(error){
        console.log("HOME error:", error);
        return res.redirect(routes.home);
    }
};

export const postHome = async (req, res) => {
    let {id, numberOfAbsence, earnedMoney, nthMeeting, entryFee} = req.body;
    let extraFeeOption=0; 
    let nextFeeOption=0;
    let extraFeeText="";
    let nextFeeText="";
    const member = await MemberDB.findById(id);
    if(nthMeeting < 0){
        if(member.earnedMoney[member.earnedMoney.length-1] === 0){
            numberOfAbsence = -1
        };
        member.TotalEarnedMoney -= member.earnedMoney[member.earnedMoney.length-1];
        member.earnedMoney.pop();
    } else if (nthMeeting > 0){
        member.earnedMoney.push(earnedMoney);
        member.TotalEarnedMoney += earnedMoney;
    }
    member.nthMeeting += nthMeeting;
    member.numberOfAbsence += numberOfAbsence;
    
    if(member.numberOfAbsence > 2) {
        extraFeeOption = 10000;
        extraFeeText = "1만원 추가";
        
    } else if(member.numberOfAbsence <= 2 && member.entryFee !== 50000){
        extraFeeOption = -10000;
        extraFeeText = "1만원 할인";
        
    } else if(member.numberOfAbsence <= 2 && member.entryFee === 50000){
        extraFeeText = "동결";
        extraFeeOption = 0;
        
    }
    member.extraFeeOption = extraFeeOption;
    member.extraFeeText = extraFeeText;

    nextFeeOption = entryFee - member.TotalEarnedMoney + extraFeeOption;
    if (nextFeeOption >= 0){
        nextFeeText = "입금";
    } else {
        nextFeeText = "환급";
    }
    member.nextFeeText = nextFeeText;
    member.nextFeeOption = Math.abs(nextFeeOption);
    member.save();
    req.session.day = member.dayOfWeek;
    // console.log(member);
    return res.redirect(routes.home);
};

export const getAddMember = (req, res) => {
    res.render("addmember", {pageTitle: "AddMember" });
};

export const postAddMember = async (req, res) => {
    //맴버추가하는 폼을 받아와서 새로운 맴버를 만들어서 홈으로 redirect해줌
    const { name, time, dayOfWeek, entryFee, nthMeeting } = req.body;
    const createdBy = req.session.loggedInUser.email;
    try {
        // const newMember = 
        await MemberDB.create({
            name,
            time,
            createdBy,
            entryFee,
            nthMeeting,
            earnedMoney: [],
            dayOfWeek
        });
        //I'm not sure using populate() is way better to filter and display MemberDB. If I push memberDB _id into UserDB.member[] when user add a member, then I also need to filter and find one specific _id in the array and delete it and save again when user delete one memberDB.  
        // const leader = await UserDB.findOne({email:createdBy});
        // leader.members.push(newMember._id);
        // leader.save();
        // console.log(leader);
        req.session.day = dayOfWeek; 
        res.redirect(routes.home);
    } catch (error) {
        console.log("add Error:", error);
        return res.redirect(routes.home);
    }
};

export const getSaved = async (req, res) => {
    const createdBy = req.session.loggedInUser.email;
    try{
        const members = await MemberDB.find({ createdBy });
        // console.log(members);
        // console.log("getSaved:",req.session);
        return res.render("saved", {pageTitle: "CART", members});
    }catch(error){
        console.log("HOME error:", error);
        return res.redirect(routes.saved);
    }
};

export const PostSaved = (req, res) => {
    //10회 종료후 리셋 처리
    //선택요일 저장하는 처리. 필요하면 나중에 루트를 따로 만들어서 별도로 사용하는게 좋을듯.
    const{chooseDay}=req.body;
    req.session.day = chooseDay;
    console.log("postsaved",chooseDay);
    return res.redirect(routes.home);
};

export const getSearch = async (req, res) => {
    const {
        query: { name:searchingPeople } 
    } = req;
    let noMember;
    if(searchingPeople == undefined){
        noMember = "";
        return res.render("search", {pageTitle: "SEARCH", noMember });
    }
    const createdBy = req.session.loggedInUser.email;
    try {
        let findMember = await MemberDB.find({ name: {$regex: searchingPeople, $options: "i" }, createdBy });
        if(findMember.length === 0){
            noMember = `There is no "${searchingPeople}" in ur group. search again with exact name of the member.`;
            return res.render("search", {pageTitle: "SEARCH", noMember });
        } else {
            // console.log(findMember);
            return res.render("search", {pageTitle: "SEARCH", findMember });
        }
    } catch(error){
        console.log("search error:", error);
        return res.redirect(routes.search);
    }
};

export const postEdit = async (req, res) => {
    //찾아서 수정해서 저장해준다. post방식은 req.body로 검색
    const {id, name, entryfee, nthMeeting, numberOfAbsence, TotalEarnedMoney, dayOfWeek}=req.body;
    const entryFee = parseInt(entryfee);
    // console.log(typeof entryFee); 
    let extraFeeOption;
    let extraFeeText;
    let nextFeeText = "입금";
    if(numberOfAbsence > 2) {
        console.log("10000원 추가해야함");
        extraFeeOption = 10000;
        extraFeeText = "1만원 추가";
        
    } else if(numberOfAbsence <= 2 && entryFee !== 50000){
        console.log("10000원 차감");
        extraFeeOption = -10000;
        extraFeeText = "1만원 할인";
        
    } else if(numberOfAbsence <= 2 && entryFee === 50000){
        console.log("유지");
        extraFeeText = "동결";
        extraFeeOption = 0;
        
    }
    let nextFeeOption= entryFee - TotalEarnedMoney + extraFeeOption;
    if (nextFeeOption < 0){
        nextFeeText = "환금";
    }
    // const updateMember = 
    await MemberDB.findByIdAndUpdate(id, {
        name,
        entryFee,
        nthMeeting,
        numberOfAbsence,
        TotalEarnedMoney,
        dayOfWeek,
        extraFeeText,
        extraFeeOption,
        nextFeeOption: Math.abs(nextFeeOption),
        nextFeeText
    });
    req.session.day = dayOfWeek;
    res.redirect(routes.saved);
};

//No template
export const deleteMember = async(req, res) => {
    const {params : {id: _id} } = req;
    try {
        await MemberDB.findOneAndDelete({ _id });
        return res.redirect(routes.saved);
    } catch(error){
        console.log("Error:", error);
        return res.redirect(routes.search);
    }
};
