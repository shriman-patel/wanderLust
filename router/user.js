const express  = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { route } = require("./listing.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",(req,res) =>{
    res.send("form");
});

// router.post("/signup",wrapAsync(async(req,res) =>{
//     try{
//     let {username, email, password}= req.body;
//     const newUser = new User({email , username});
//     const registeredUser = await User.register(newUser, password);
//     console.log(registeredUser);
//     req.login(registeredUser,(err)=>{
//         if(err){
//            return next(err); 
//         }
//       req.flash("success", "Welcome to Wanderlust");
//       res.redirect("/listings");
//     })
  
//     }catch(e){
//         req.flash("error",e.message);
//        res.redirect("/signup");
//     }
// }));

// // login router
// router.get("/login",(req,res)=>{
//     res.render("users/login.ejs");
// });


// router.post("/login",passport.authenticate
// ("local",{failureRedirect: "/login",failureFlash:true}),
// async(req,res)=>{
// req.flash("success","welcome to wanderlus! you are logined in!");
// //let redirectUrl = res.locals.redirectUrl || "/listings";
// res.redirect("/listings");
// });


// // logout router
// router.get("/logout",(req,res,next)=>{
//     req.logout((err) =>{
//       if(err){
//         next(err);
//       } 
//        req.flash("success", "you are logged out!");
//       res.redirect("/listings");
//     });
// });
// module.exports =  router;
