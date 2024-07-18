"use client"

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import handleForm from './action';

export default function Login() {
  

  // 리턴값을 state로 저장하고, action을 트리거로 제공
  // use server 와 use client는 서로 분리되어야 한다. 같은 페이지에 적힐 수 없다
  const [state, action] = useFormState(handleForm,null);
  //action을 실행하면 handleForm 이 실행되고, handleForm의 리턴값이 state에 저장된다
  

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요</h1>
        <h2 className='text-xl'>Log in with email and password</h2>
      </div>
      
      <form className='flex flex-col gap-3' action={action}>
        <FormInput
        name='email'
        type="email" placeholder='Email' required  errors = {[]}/> 
        <FormInput
        name='password'
        type="password" placeholder='Password' required  errors = {state?.errors ?? []}/>
        
        <FormButton  text="Create account"/>
      </form>

      <SocialLogin/>
    </div>
  );
}
