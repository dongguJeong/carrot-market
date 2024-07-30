"use server";
import { PASSWORD_ERR_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import db from '@/lib/db';
import {z} from 'zod';
import bcrypt from 'bcrypt'
import {getSession} from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = (email : string) => {
  const user = db.user.findUnique({
    where : {
      email
    },
    select : {
      id : true,
    },
  });
    return Boolean(user);
}

const formSchema = z.object({
  email : z.string({
    required_error : "필수사항입니다"
  }).email().toLowerCase()
  .refine(checkEmailExists, "회원가입되지 않은 이메일입니다"),

  password : z.string({
    required_error : "필수사항입니다"
  }).min(PASSWORD_MIN_LENGTH)
  //.regex(PASSWORD_REGEX,PASSWORD_ERR_MESSAGE),
});

export default async function login(prevState : any ,formData : FormData)
{
  const data = {
    email : formData.get('email'),
    password : formData.get('password'),
  }

  const result = await formSchema.safeParseAsync(data);

  if(!result.success){
    console.log(result.error?.flatten());
    return result.error.flatten();
  }
  else{
    const user = await db.user.findUnique({
      where : {
        email : result.data.email
      },
      select : {
        id : true,
        password : true
      }
    });

    const ok = await bcrypt.compare(result.data.password 
      ,user!.password ?? "xxxx"
      );
      
    if(ok){
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    }
    else{
      return{
        fieldErrors : {
          password : ["Wrong password"],
        }
      }
    }
  }
  
}
  
