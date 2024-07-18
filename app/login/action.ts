"use server";

export default async function handleForm(prevState : any ,data : FormData)
{
    await new Promise((resolve) => setTimeout(resolve,5000)) ;
    console.log(data.get('email'));
    
    // return을 통해 useFormState에 넘겨줌
    return{
      errors : ['wrong password',"비밀번호가 너무 짧습니다"]
    }
}