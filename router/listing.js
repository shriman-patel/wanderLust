const express  = require("express");
const router = express.Router();
const wrapAsync  = require("../utils/wrapAsync.js");
const ExpressError  = require("../utils/ExpressError.js");
const {listingSchema} =require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
   if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
       next();
   }
   };
//index route
router.get("/",
    wrapAsync(async(req,res)=>{
 const allListings =   await Listing.find({});
 res.render("listings/index.ejs",{allListings});
    }));

    // new Route
  router.get("/new",isLoggedIn,(req,res) =>{
   res.render("listings/new.ejs");
 });
    // show route
    router.get("/:id",wrapAsync(async(req,res)=>{
      let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
    // .populate("owner");
    if(!listing){
         req.flash("error","listing you requested for does not exist!");
         res.redirect("/listings");
        }
       // console.log(listing);
     res.render("listings/show.ejs",{listing});
    }));




 // create Route
 router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next) =>{
const newlisting = new Listing(req.body.listing);
   await newlisting.save();
   req.flash("success","new listing created!");
res.redirect("/listings");
 }));
 // edit routes
router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
         req.flash("error","listing you requested for does not exist!");
         res.redirect("/listings");
        }
    res.render("listings/edit.ejs",{listing});
   }));

   // Update route
   router.put("/:id",isLoggedIn,validateListing,wrapAsync(async(req,res) =>{
      let {id} =req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);   
}));
// delete route
router.delete("/:id",isLoggedIn, wrapAsync(async(req,res) =>{
   let {id} = req.params;
  let  deletedlisting = await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
   req.flash("success"," listing deleted!");
  res.redirect("/listings");
}));

module.exports=router;
 