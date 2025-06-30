module.exports.isLoggedIn = (req,res,next) => {

    if(!req.isAuthenticated()){// if user login and signup nhi kiya hai to
      // req.session.redirectUrl =  req.originalUrl;
       req.flash("error","you must be loggined in to create listings!");
       return res.redirect("/login");
   }
   next();
};
// module.exports.saveRedirectUrl = (req,res,next)=>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl=req.session.redirectUrl;
//     }
//     next();
// };