"use server";
import { PASSWORD_ERR_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import {z} from 'zod';

const formSchema = z.object({
  email : z.string({
    required_error : "필수사항입니다"
  }).email().toLowerCase(),
  password : z.string({
    required_error : "필수사항입니다"
  }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_ERR_MESSAGE),
});

export default async function login(prevState : any ,formData : FormData)
{
  const data = {
    email : formData.get('email'),
    password : formData.get('password'),
  }

  const result = formSchema.safeParse(data);

  if(!result.success){
    console.log(result.error?.flatten());
    return result.error.flatten();
  }
  
}