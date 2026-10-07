import {Router} from "express";

const billingRoutes = Router();

billingRoutes.get("/",(req,res,next)=>{
    res.send("Billing page from Express server")
});

export default billingRoutes;