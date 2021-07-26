import mongoose from "mongoose";

//스키마 수정 필요 몇개는 생성할때 required 필요(이름, 생성자, 금액, 회차, 요일)
const memberSchema = new mongoose.Schema({
    name: { type:String, required: true},
    time: String,
    createdBy: { type:String, required: true},
    entryFee: { type:Number, required: true},
    nthMeeting: { type:Number}, //기본 1회 (범위를 정하면 좋을듯)
    numberOfAbsence: { type:Number, default: 0}, 
    earnedMoney: { type:Number, default: 0}, 
    dayOfWeek: { type:String, required: true}
});

const MemberDB = mongoose.model("Member", memberSchema);

export default MemberDB