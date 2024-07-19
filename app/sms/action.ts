'use server'

import {z} from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';


const phoneSchema = z.string().trim().refine((phone) =>
    validator.isMobilePhone(phone,'ko-KR'),
    "잘못된 형식입니다"
);

// 유저가 보낸 것은 자동으로 string으로 변환됨. 그게 숫자인지 검증하려면 직접 숫자로 변환해줘야 함 : coerce.number()
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState{
    token : boolean
}

export async function smsLogin(prevState : ActionState , formData : FormData){
    const phone = formData.get('phone');
    const token = formData.get('token');

    // 전화번호 입력할 때
    if(!prevState.token){
        const result = phoneSchema.safeParse(phone);
        if(!result.success){
            return{
                token : false,
                error : result.error.flatten(),
            }
        }
        else{
            return{
                token : true,
            }
        }
    }

    else{
        const result = tokenSchema.safeParse(token);
        if(!result.success){
            return{
                token : true,
                error : result.error.flatten(),
            }
        }
        else{
            redirect('/');
        }
    }

}