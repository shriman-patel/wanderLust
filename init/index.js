const mongoose = require("mongoose");
const initData =  require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
   console.log("connected to DB");
})
.catch((err) => {
   console.log(err);
});

async function main() {
   await mongoose.connect(MONGO_URL); // ✅ Fixed here
}
const initDB = async ()=>{
   await Listing.deleteMany({});
  // initData.data = initData.data.map((obj)=>({...obj,ownes:"65d0081ae547c5d37e56b5f"} ));
   await Listing.insertMany(initData.data);
   console.log("data was init");
};
initDB();