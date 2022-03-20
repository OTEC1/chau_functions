import axios from "axios";
import {Response, Request} from 'express'


export const  CreateOrder =  async (req:Request, res: Response) => {
    InitalizePaymentFlow(req,res);
}

export const  Capture = async (req:Request, res:Response) => {
    const  tk = req.query.token;
    //const pid = req.query.PayerID;
    axios({
        method: 'post',
        url: `${process.env.PAY_PAL_API_BASE}/v2/checkout/orders/${tk}/capture`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        auth:{
            username: process.env.PAYPAL_KEY!,
            password: process.env.PAYPAL_SECRET!
        },
    }).then(respones => {
        console.log(respones.data);
        res.redirect('https://localhost:3005/capture')
    }).catch(err => {
        return  res.status(500).json(err as Error)
    })
    
}

export const  Cancel = async (req:Request, res:Response) => {
        const   tk = req.query.token;
        console.log(tk);
        res.redirect('https://localhost:3005/cancel')
}



async function InitalizePaymentFlow(req:Request, res:Response) {
    axios({
        method: 'post',
        url: `${process.env.PAY_PAL_API_BASE}/v1/oauth2/token`,
        data: 'grant_type=client_credentials', 
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Content-Type':'application/x-www-form-urlencoded',
        }, 
        auth:{
            username: process.env.PAYPAL_KEY!,
            password: process.env.PAYPAL_SECRET!
   }
    }).then(rest =>{
        console.log(rest.data.access_token);
        CreatingOrder(rest.data.access_token,req,res);
    }
    ).catch(err => {
        return  err as Error
    })
} 



function CreatingOrder(data:any,req:Request, res:Response){
    const placeOrder = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value:"3.00"
                },
                description: "All Ok",
            },
        ],
        application_context: {
         brand_name: "Mybrand.com",
         landing_page: "LOGIN",
         user_action: "PAY_NOW",
         return_url:"http://localhost:6002/chau02-b4019/us-central1/webfly/capturehpayment",
         cancel_url: "http://localhost:6002/chau02-b4019/us-central1/webfly/cancel"
        }
};

 axios.post(`${process.env.PAY_PAL_API_BASE}/v2/checkout/orders`, placeOrder ,{
    headers:{
        Authorization :`Bearer ${data}`
    },
    }).then(respones => {
        //res.redirect(respones.data.links[1].href);
        return res.status(200).json(respones.data.links[1].href);
         
    }).catch(err => {
        return  res.status(200).json(err as Error)
    })
}  


export const PaymentStatus = async (req:Request, res:Response) => {

}