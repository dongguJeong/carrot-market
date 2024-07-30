"use client"

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import login from './action';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

export default function Login() {
  
  // 리턴값을 state로 저장하고, action을 트리거로 제공
  // use server 와 use client는 서로 분리되어야 한다. 같은 페이지에 적힐 수 없다
  const [state, action] = useFormState(login,null);
  //action을 실행하면 handleForm 이 실행되고, handleForm의 리턴값이 state에 저장된다
  

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요</h1>
        <h2 className='text-xl'>Log in with email and password</h2>
      </div>
      
      <form className='flex flex-col gap-3' action={action}>
        <Input
        name='email'
        type="email" placeholder='Email' required 
        /> 
        <Input
        name='password'
        minLength={PASSWORD_MIN_LENGTH}
        errors={state?.fieldErrors?.password}
        type="password" placeholder='Password' required />
        
        <Button  text="Create account"/>
      </form>

      <SocialLogin/>
    </div>
  );
}
