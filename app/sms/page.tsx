'use client'

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import {smsLogin} from './action';

const initialState = {
  token : false,
  errors : undefined,
}

export default function SMSLogin() { 

  const [state,action] = useFormState(smsLogin,initialState);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number</h2>
      </div>
      
      <form action={action} className='flex flex-col gap-3'>
        

     
        {state.token ? 

        <Input
        type="number" name='token' placeholder='Verification code' required
        min={100000} max={999999} key={1}
        /> 
        : 
        <Input
        type="text" name='phone' placeholder='Phone number' required 
        errors={state.error?.formErrors} key={2}
        /> 
        }
        
        <Button  text={state.token ? "Verify Token" : "Send Verification SMS"}/>
      </form>
    </div>
  );
}
