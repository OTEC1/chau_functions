/* eslint-disable */
import * as functions from "firebase-functions";
import * as express from "express";
import {getAllResquest,banklistapi,foodcategory,SendPasswordRestLink} from "./Models/model_data";
import {LeanAddPost,LeanGetAllPost,LeanUpdatePost,LeanGetPostByCategory} from "./Models/learn_data"
import {HomeList,LeanGetPostByTab,Learnvisitcount,LearnGetvisitcount} from "./Models/learn_data"
import { CreateOrder, Capture, PaymentStatus, Cancel} from "./Models/Webflystore";
import * as corsmodule from "cors";
const cors = corsmodule(({origin: true}));

//Start Chau
const appCat = express();
appCat.use(cors);
appCat.get("/Snap_cat", getAllResquest);
appCat.get("/Banklist", banklistapi);
appCat.get("/food_category", foodcategory);
appCat.post("/SendPasswordRestLink",SendPasswordRestLink);
appCat.get('')
exports.appCat = functions.https.onRequest(appCat);


export const getTimeStamp = functions.https.onRequest((request, respones) => {
  cors(request, respones, async () => {
    respones.setHeader("Content-Type", "application/json");
    respones.send(JSON.stringify({timestamp: Date.now()}));
  });
});

//End  of Chau Functions










//Start of Learn
const Zlearner = express();
Zlearner.use(cors)
Zlearner.post("/LeanAddPost",LeanAddPost);
Zlearner.get("/LeanGetAllPost",LeanGetAllPost)
Zlearner.post("/LeanGetPostByCategory",LeanGetPostByCategory);
Zlearner.post("/LeanUpdatePost",LeanUpdatePost);
Zlearner.post("/HomeList",HomeList);
Zlearner.post("/LeanGetPostByTab",LeanGetPostByTab);
Zlearner.post("/Learnvisitcount",Learnvisitcount)
Zlearner.get("/LearnGetvisitcount",LearnGetvisitcount)
exports.Zlearner = functions.https.onRequest(Zlearner);
//End of Learn









//Start of Webflystore
const webfly = express();
webfly.use(cors)
webfly.post("/authpayment", CreateOrder);
webfly.get("/capturehpayment", Capture);
webfly.get("/paymentstatus", PaymentStatus);
webfly.get("/cancel", Cancel)
exports.webfly = functions.https.onRequest(webfly);