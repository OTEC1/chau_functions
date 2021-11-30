import * as functions from "firebase-functions";
import * as express from "express";
import {getAllResquest} from "./config/model_data";
import {banklistapi} from "./config/model_data";
import {foodcategory} from "./config/model_data";
import * as corsmodule from "cors";
const cors = corsmodule(({origin: true}));

// can make multiply calls  from within appCat block
const appCat = express();
appCat.get("/Snap_cat", getAllResquest);
appCat.get("/Banklist", banklistapi);
appCat.get("/food_category", foodcategory);
exports.appCat = functions.https.onRequest(appCat);

// date
export const getTimeStamp = functions.https.onRequest((request, respones) => {
  cors(request, respones, async () => {
    respones.setHeader("Content-Type", "application/json");
    respones.send(JSON.stringify({timestamp: Date.now()}));
  });
});
