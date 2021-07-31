import mongoose from "mongoose";

//스키마 수정 필요 몇개는 생성할때 required 필요(이름, 생성자, 금액, 회차, 요일)
const memberSchema = new mongoose.Schema({
    name: { type:String, required: true},
    time: String,
    createdBy: { type:String, required: true},
    entryFee: { type:Number, required: true},
    nthMeeting: { type:Number}, //기본 1회 (범위를 정하면 좋을듯)
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

//earnedMoney[]배열로 만들고, totalEarnedMoney는 합산으로 만들고.