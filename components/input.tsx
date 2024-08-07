import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps{
    errors? : string[],
    name : string,
}

const _Input =(
    {
    errors =[],
    name,
    ...rest
    } : InputProps &
     InputHTMLAttributes<HTMLInputElement>, ref : ForwardedRef<HTMLInputElement>) => {
    return(
        <div className='flex flex-col gap-2'>
        <input 
        ref = {ref}
        className='bg-transparent rounded-md w-full h-10 transition
        focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500
        px-2 placeholder:text-neutral-400'
        name={name}
        {...rest}
        />
        <span className='text-red-500 font-medium'>{errors.map((e, idx) => 
        (<span key={idx}>{e} <br/></span>)
        )}</span>
      </div>
    )
}

export default forwardRef(_Input);