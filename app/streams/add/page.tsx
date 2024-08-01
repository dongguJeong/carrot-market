'use client'

import { startStream } from "@/app/(tabs)/live/action";
import FormButton from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";

export default function Stream(){
    const [state, action] = useFormState(startStream, null);

    return(
        <form className="p-5" action={action}>
            <Input name="title" required placeholder="Title of your stream"  errors={state?.formErrors}/>
            <FormButton text="start streaming"/>
        </form>
    )
}