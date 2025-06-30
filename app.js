const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
//const Listing = require("./models/listing.js");
const methodOverride= require("method-override");
 const ejsMate = require("ejs-mate");
const ExpressError  = require("./utils/ExpressError.js");
const session =  require("express-session");
//const { connect } = require("http2");
const flash = require("connect-flash");
const passport = require("passport"); // use password
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./router/listing.js");
const reviewsRouter = require("./router/review.js");
const userRouter = require("./router/user.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
// basic setup
main().then(() => {
   console.log("connected to DB");
}).catch((err) => {
   console.log(err);
});
//basic setup
async function main() {
   await mongoose.connect(MONGO_URL); 
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOption = {
   secret: "nysupersecretcode",
   resave: false,
   saveUninitialized: true,
   cookies:{ 
      expires : Date.now() +7*24*60*60*1000,
      maxAge: 7 * 24*60*60*1000,
      httpOnly: true,
   },
};

//basic setup
app.get("/", (req, res) => {
   res.send("I am root");
});



app.use(session(sessionOption));
app.use(flash());

//use password
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
   res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
  //  res.locals.currUser = req.user;
   next();
});

// app.engine('ejs', ejsmate);

app.get("/demouser",async(req,res)=>{
   let fakeUser = new User({
      email:"student@gmail.com",
      username: "delta-student"
   });
   let registeredUser = await User.register(fakeUser,"helloworld");
   res.send(registeredUser )
});
  
//app.get("/listings",async(req,res)=>{
// Listing.find({}).then((res)=>{
//     console.log(res);
// });
// const allListings = await Listing.find({});
// res.render("listings/index",{allListings});
// });
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
// app.use("/listings", reviewsRouter);  // ✅ FIXED VERSION

app.use("/",userRouter);

// app.all("*",(req,res,next)=>{
//    next(new ExpressError(404,"page Not Found!"));
// });

 app.use((err,req,res,next) => {
   let {statusCode = 500, message="hello this is went wrong!"} = err;
 res.status(statusCode).render("error.ejs",{message});
 
});

app.get("/testListing", async(req,res)=>{
    let sampleListing = new Listing({
        title: "my new ville",
        description: "by the beach",
        price:1200,
        location: "calangute goa",
        country:"India",
    });
    await sampleListing.save();
    console.log("sample was save");
    res.send("successful send");
});
//basic setup
app.listen(8080, () => {
console.log("server is listening to port 8080");
});
