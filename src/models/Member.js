import mongoose from "mongoose";

//스키마 수정 필요 몇개는 생성할때 required 필요(이름, 생성자, 금액, 회차, 요일)
const memberSchema = new mongoose.Schema({
    name: { type:String, required: true},
    createdBy: { type:String, required: true},
    entryFee: { type:Number, required: true},
    nthMeeting: { type:Number, default: 1}, 
    numberOfAbsence: { type:Number, default: 0},
    extraFeeOption: {type:Number},
    earnedMoney: [{type:Number}],
    TotalEarnedMoney: { type:Number, default: 0}, 
    nextFeeOption: { type: Number},
    // dayOfWeek: { type:String, required: true},
    extraFeeText: { type: String},
    nextFeeText: { type: String}
});

const MemberDB = mongoose.model("Member", memberSchema);

export default MemberDB


