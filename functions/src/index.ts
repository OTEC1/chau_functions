import * as functions from "firebase-functions";
import * as express from "express";
import {getAllResquest} from "./config/Post_data";

const appCat = express();
appCat.get("/Snap_cat", getAllResquest);
exports.appCat = functions.https.onRequest(appCat);

// date
export const getTimeStamp = functions.https.onRequest((request, respones) => {
  respones.setHeader("Content-Type", "application/json");
  respones.send(JSON.stringify({timestamp: Date.now()}));
});
