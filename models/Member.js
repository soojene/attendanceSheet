import mongoose from "mongoose";

//스키마 수정 필요 몇개는 생성할때 required 필요(이름, 생성자, 금액, 회차, 요일)
const memberSchema = new mongoose.Schema({
    name: { type:String, required: true},
    time: String,
    createdBy: { type:String, required: true},
    entryFee: { type:Number, required: true},
    nthMeeting: { type:Number, default: 0}, 
    numberOfAbsence: { type:Number, default: 0},
    extraFeeOption: {type:Number},
    earnedMoney: [{type:Number}],
    TotalEarnedMoney: { type:Number, default: 0}, 
    nextFeeOption: { type: Number},
    dayOfWeek: { type:String, required: true},
    extraFeeText: { type: String},
    nextFeeText: { type: String}
});

const MemberDB = mongoose.model("Member", memberSchema);

export default MemberDB

//배열과 값을 설정할 수 있나? 배열의 length를 10이하, 그리고 nthMeeting값을 10이하로..그러면 그 값을 넘어가면 어떻게 되는거지?

