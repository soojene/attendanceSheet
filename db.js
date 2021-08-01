import mongoose from "mongoose";

//.env로 주소 따로 저장해주기
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
});

const db = mongoose.connection;

const WhenDBConnected = () => console.log("🚚 DB connection succeeded ");

db.on("error", (error) => console.log(" ERROR on DB", error));

db.once("open", WhenDBConnected);