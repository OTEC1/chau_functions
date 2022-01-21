/* eslint-disable */
import {Response,Request} from "express";
import { firestore } from "firebase-admin";
import {db} from "../config/firebase";


type Programming={

    title:string,
    writeUp:string,
    doc_id:string,
    img_url:string,
    views:number,
    video_url:string
    timestamp:number,
    date_time:string,
    youtubeLink: string,
    category:string,
}




export const LeanAddPost = async (req: Request,res: Response) => {

    try{
        let i: Programming = req.body;
        const e = db.collection("ZLeanAddPost").doc();
        i.doc_id = e.id;
        e.set(i);    
        return res.status(200).json(e.id);
      
    }catch(err) {
        return res.status(500).json(err);
    }   
}




export const LeanGetAllPost = async (req: Request,res: Response) => {

    try{
        const service: Programming[] = [];
        const querysnapsnot = await db.collection("ZLeanAddPost").get();
        querysnapsnot.forEach((doc: any) => service.push(doc.data()));
    
          return res.status(200).json(service);
      
        }catch(err) {
            return res.status(500).json(err);
        }   
}






export const LeanUpdatePost = async (req: Request,res: Response) => {
    try{
        var indicator  = 0;
        const e: Programming =  req.body;
        const querysnapsnot =  db.collection("ZLeanAddPost").doc(e.doc_id);
            if((await querysnapsnot.get()).exists)
                 querysnapsnot.update("views",firestore.FieldValue.increment(1))
                        if((await querysnapsnot.get()).updateTime)
                                indicator = 1;

          return res.status(200).json(indicator);
      
        }catch(err) {
            return res.status(500).json(err);
        }   
}




export const LeanGetPostByCategory = async (req: Request,res: Response) => {
    try{
        const e: Programming =  req.body;
        const service: Programming  [] = [];
        const querysnapsnot =   db.collection("ZLeanAddPost");
        const allCapitalsRes = await querysnapsnot.where('category', '==', e.category).get();
        allCapitalsRes.forEach((doc:any) => service.push(doc.data()))
            
          return res.status(200).json(service);
      
        }catch(err) {
            return res.status(500).json(err);
        }   
}


export const  HomeList = async (req:Request, res:Response) => {
    try{

        let e : Programming = req.body;
        let list:string [] = [];

        if(e.views === 1){
            list = ["Select an Option", "AWS Cloud Services","FaceBook for Business API","Learn Microsoft Azure", "Explore Blockchain Technology"];
        }else
            if(e.views === 2)
                list = ["Select an Option", "Java", "Python", "React JS", "Android studio", "Git bash","C","Ruby","C#","HTML","CSS"]
        else
            if(e.views === 3)
                list = ["Select an Option", "Cisco", "aws", "Microsoft"]
        else
            if(e.views === 4)
                list = ["Select an Option", "How to Share a printer", "How to enable developer mode"]

        return res.status(200).json(list);

    }catch(err) {
        return res.status(500).json(err);
    }
}


