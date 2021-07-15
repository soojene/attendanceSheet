export const fakeDB = [
    {
        name: "Soo",
        email: "email@email",
        phoneNumb: 1012341234,
        startFee: 50000,
        nthAttendence: 2,
        numbOfAbsence:2,
        earnedMoney: 9000,
        dayOfweek:"SAT"
    },
    {
        name: "Bam",
        phoneNumb: 1056785678,
        startFee: 50000,
        nthAttendence: 2,
        numbOfAbsence:2,
        earnedMoney: 10000,
        dayOfweek:"SAT"
    },
    {
        name: "Paa",
        phoneNumb: 1012341234,
        startFee: 50000,
        nthAttendence: 2,
        numbOfAbsence:3,
        earnedMoney: 9000,
        dayOfweek:"MON"
    },
    {
        name: "Nee",
        phoneNumb: 1056785678,
        startFee: 50000,
        nthAttendence: 2,
        numbOfAbsence:4,
        earnedMoney: 10000,
        dayOfweek:"MON"
    },
];

//make two models
    //User and member
    //-user{who can login and make and access to memberObj}
        // name, email, password
    //-member{pulished by a user aka leader}
        //name, createdByWho, startFee, earnMoney, nthOfAttendence, dayOfWeek, #ofAbsence


//요일별 필터링
//     const {query: { day: dayOf }} = req;
//     console.log(`getHome:${dayOf}`);
//     if(dayOf){
//         const members = fakeDB.filter(member => member.dayOfweek === dayOf);
//         return res.render("home", {pageTitle: "Home", members });
//     } 
//     const members = fakeDB.filter(member => member.dayOfweek === "SAT");
//         res.render("home", {pageTitle: "Home", members });
// };
