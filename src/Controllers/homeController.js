import routes from '../routes';
import MemberDB from '../models/Member';

export const getHome = async(req, res) => {
    const createdBy = req.session.loggedInUser.email;
    try{
        const members = await MemberDB.find({createdBy});
        let apple =[];
        members.forEach((member) => apple.push(member.nthMeeting));
        const nth = Math.min(...apple);
        return res.render("home", {pageTitle: "HOME", members, nth});
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
    if(member.numberOfAbsence < 0){
        member.numberOfAbsence = 0;
    };
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
    // req.session.day = member.dayOfWeek;
    // console.log(member);
    return res.redirect(routes.home);
};

export const getAddMember = (req, res) => {
    res.render("addmember", {pageTitle: "AddMember" });
};

export const postAddMember = async (req, res) => {
    let { name, entryFee, nthMeeting } = req.body;
    const createdBy = req.session.loggedInUser.email;
    try {
        const newMember = await MemberDB.create({
            name,
            createdBy,
            entryFee,
            nthMeeting,
            earnedMoney: [],
            TotalEarnedMoney: 0
        });
        if(nthMeeting !== 1){
            for(let i = 1; i < nthMeeting; i++){
                newMember.earnedMoney.push(0);
            };
            newMember.save();
        }
        // req.session.day = dayOfWeek;
        // console.log(newMember);
        return res.redirect(routes.home);
    } catch (error) {
        console.log("add Error:", error);
        return res.redirect(routes.home);
    }
};

export const getSaved = async (req, res) => {
    const createdBy = req.session.loggedInUser.email;
    try{
        const members = await MemberDB.find({ createdBy });
        return res.render("saved", {pageTitle: "CART", members});
    }catch(error){
        console.log("HOME error:", error);
        return res.redirect(routes.saved);
    }
};

export const PostSaved = (req, res) => {
    //선택요일을 서버에서 처리
    // const{chooseDay}=req.body;
    // req.session.day = chooseDay;
    // console.log("postsaved",chooseDay);
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
            noMember = `"${searchingPeople}"이라는 멤버가 존재하지 않습니다. 멤버추가 또는 정확한 이름으로 다시 검색해주세요.`;
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
    const {name, numberOfAbsence, index, changedEarnedMoney, entryfee, id}=req.body;
    const entryFee = parseInt(entryfee);
    let extraFeeOption;
    let extraFeeText;
    let nextFeeText = "입금";
    if(numberOfAbsence > 2) {
        extraFeeOption = 10000;
        extraFeeText = "1만원 추가";
        
    } else if(numberOfAbsence <= 2 && entryFee !== 50000){
        extraFeeOption = -10000;
        extraFeeText = "1만원 할인";
        
    } else if(numberOfAbsence <= 2 && entryFee === 50000){
        extraFeeText = "동결";
        extraFeeOption = 0;
    };
    try{
        const member = await MemberDB.findById(id);
        if(index && changedEarnedMoney){
            const inDex = parseInt(index);
            const changedMoney = parseInt(changedEarnedMoney);
            member.earnedMoney.splice(inDex,1,changedMoney);
            member.TotalEarnedMoney= member.earnedMoney.reduce(function add(a, b) {
                return a + b;}, 0);
            member.nextFeeOption=entryFee - member.TotalEarnedMoney + extraFeeOption;
        }else{
            member.nextFeeOption=entryFee - member.TotalEarnedMoney + extraFeeOption;
        };

        if (member.nextFeeOption < 0){
            nextFeeText = "환급";
        };
        member.name = name;
        // member.dayOfWeek = dayOfWeek;
        member.numberOfAbsence = numberOfAbsence;
        member.entryFee = entryfee;
        member.nextFeeOption = Math.abs(member.nextFeeOption);
        member.extraFeeOption = extraFeeOption;
        member.extraFeeText = extraFeeText;
        member.nextFeeText = nextFeeText;
        member.save();
        return res.redirect(routes.saved);
    }catch(error){
        console.log("POST EDIT:", error);
        return res.redirect(routes.saved);
    }
};

//No template
export const deleteMember = async(req, res) => {
    const {params : {id: _id} } = req;
    try {
        await MemberDB.findOneAndDelete({ _id });
        return res.status(200).redirect(routes.saved);
    } catch(error){
        console.log("Error:", error);
        return res.redirect(routes.search);
    }
};

export const reset = async(req, res) => {
    const {params : {id: _id} } = req;
    try{
        const member = await MemberDB.findById(_id);
        member.nthMeeting=1;
        member.numberOfAbsence = 0;
        member.earnedMoney =[];
        member.TotalEarnedMoney = 0;
        member.entryFee += member.extraFeeOption;
        member.extraFeeOption = 0;
        member.extraFeeText = "";
        member.nextFeeOption = 0;
        member.nextFeeText= "";
        member.save();
        return res.status(200).redirect(routes.saved);
    } catch (err) {
        console.log("postReset:", err);
        return res.redirect(routes.saved);
    }
};

export const postRecordTime = (req, res) => {
    const {timeBegin}=req.body;
    //로그아웃할때 모델에 세션에 마지막으로 저장된 시간을 한번 저장하고, 로그인할때 세션에 저장해서 사용하고 변경 될때마다 세션에 저장시킴.
    req.session.startTime = timeBegin;
    res.redirect(routes.home);
};

export const goFetch = async (req, res) => {
    const createdBy = req.session.loggedInUser.email;
    try{
        const members = await MemberDB.find({createdBy});
        return res.json({members})
    }catch(error){
        console.log("HOME error:", error);
        return res.redirect(routes.home);
    }
};