"use client"

import { useFormStatus } from "react-dom";

interface FormButtonProps{
    
    text : string;
}

export default function FormButton({text} : FormButtonProps){
    
    // submit 이벤트의 상태, data 를 받아올 수 있음
    // 단 useFormStatus는 form 의 내부(자식)에서만 사용하는 게 규칙이다
    const {pending} = useFormStatus();

    return <button disabled={pending} className='primary-btn 
    disabled:cursor-not-allowed
    disabled:bg-neutral-400 disabled:text-neutral-300'>{pending ? "로딩 중" : text}</button>
}