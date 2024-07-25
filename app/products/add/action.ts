'use server'

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { productSchema } from "./schema";



export async function  uploadProduct(formData:FormData) {
 const data = {
    title :  formData.get("title"),
    photo : formData.get("photo"),
    price : formData.get("price"),
    description : formData.get("description"),
 };

 

    const results = productSchema.safeParse(data);
    if(!results.success){
        return results.error.flatten();
    }
    else{
        const session = await getSession();
        if(session.id){
            const product = await db.product.create({
            data : {
                title : results.data.title,
                description : results.data.description,
                price : results.data.price,
                photo : results.data.photo,
                user : {
                    connect : {
                        id : session.id,
                    }
                }
                },
                select : {
                    id : true,
                }
            });
            redirect(`/products/${product.id}`);
        }
    }
}

export async function getUploadUrl() {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,{
        method : "POST",
        headers : {
             "Authorization" : `Bearer ${process.env.CLOUDFLARE_TOKEN}`
        },

    });
    const data = await response.json();
    return data;
}