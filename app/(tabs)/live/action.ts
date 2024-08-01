'use server'

import {z} from "zod";
const title = z.string();

export async function startStream(_:any, formData : FormData){
    const results = title.safeParse(formData.get('title'));
    if(!results.success){
        return results.error.flatten();
    }    
}