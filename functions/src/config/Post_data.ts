import {Response} from "express";
import {db} from "./firebase";


type EntryType = {
  category: string,
  imgurl: string,
};


type Request = {
  body: EntryType,
  params: {entryId: string};
};

const getAllResquest = async (req: Request, res: Response) => {
  try {
    const lists: EntryType[] = [];
    const querysnapsnot = await db.collection("Category Uploads").get();
    querysnapsnot.forEach((doc: any) => lists.push(doc.data()));
    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {getAllResquest};

