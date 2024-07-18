interface FormInputProps{
    type : string,
    placeholder : string,
    required : boolean,
    errors : string[],
    name : string ;
}

export default function FormInput({type,placeholder,required,errors,name} : FormInputProps){
    return(
        <div className='flex flex-col gap-2'>
        <input className='bg-transparent rounded-md w-full h-10 transition
        focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500
        px-2 placeholder:text-neutral-400'
        name={name}
        type={type} 
        placeholder={placeholder} required = {required}/>
        <span className='text-red-500 font-medium'>{errors.map((e, idx) => 
        (<span key={idx}>{e} <br/></span>)
        )}</span>
      </div>
    )
}