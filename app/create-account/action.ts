"use server" // 서버에서 유효성 검사를 할 것임

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import {z} from 'zod';

function checkUsername(username : string){
    return !username.includes('엄준식');
}

const checkPasswords = ({password, confirm_password} : {password : string, confirm_password :string}) => {
    return password === confirm_password
}

// 데이터가 어떻게 생겼는지 zod에게 알려줌
const formSchema = z.object({
    username : z.string({
        invalid_type_error : "유저이름은 string이여야 합니다",
        required_error : "유저네임은 필수 사항입니다"
    }).min(PASSWORD_MIN_LENGTH,"유저 네임은 3글자 이상이여야 합니다")
    .toLowerCase().trim()
    .transform((username) => `🍎 ${username}`)
    .refine(checkUsername, "어떻게 사람이름이 엄준식"),

    email : z.string({
        invalid_type_error : "이메일 형식을 지켜주세요",
        required_error : "이메일은 필수 사항입니다"
    }).email(),

    password:z.string({
        invalid_type_error : "비밀번호는 string이여야 합니다",
        required_error : "비밀번호는 필수 사항입니다"
    }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,"비밀번호는 대소문자와 특수문자를 포함해야 합니다"),
   
    confirm_password : z.string({
        invalid_type_error : "비밀번호는 string이여야 합니다",
        required_error : "필수 사항입니다"
    }).min(PASSWORD_MIN_LENGTH),
}).refine(checkPasswords,{
    message : "비밀번호와 검증용 비밀번호가 일치하지 않습니다" ,
    path : ['confirm_password'],
});

export async function  createAccount(prevState : any, 
    formData : FormData) {
    
    const data = {
        username:formData.get('username') , 
        email:formData.get('email'),
        password:formData.get('password'),
        confirm_password:formData.get('confirm_password'),
    };

    //zod에게 데이터 전송
    //parse는 유효성 검사가 실패하면 에러를 발생
    // saveParse는 실패해도 에러를 발생시키지 않는 대신 오브젝트를 넘겨줌.
    const result = formSchema.safeParse(data);
    if(!result.success){
        return result.error.flatten();
    }
    

}