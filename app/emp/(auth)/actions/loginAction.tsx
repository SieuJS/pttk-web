"use server";
import { accordionSummaryClasses } from "@mui/material";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'

export type FormData = {
    username : string , 
    password : string 
};

export type ResponseData = {
    message : string ,
    account : object,
    ok : boolean
}


export async function loginAction (data : FormData) {
    let result ; 
    try {
        result = await fetch(
            `${process.env.BACKEND_API}/emp/signin`,
            {
                body : JSON.stringify(data),
                headers : {
                    'Content-Type' : 'application/json'
                },
                method : 'POST'
            }
        ).then (res => {

            if(!res.ok) throw res.json();
            return res.json();
        }).then (async res => {
            cookies().set({
                name: 'sessionToken',
                value: res.accessToken,
                httpOnly: true,
                path: '/',
            })
            console.log(res.message)
            return {
                account : res.account,
                message : res.message,
                ok : true
            };
        })
        ;
        return result;
    }   
    catch (err : any) {
        console.log('login accion emp,',err)
        return {message : err.message, ok : false }
    }
    revalidatePath("/signin");

}