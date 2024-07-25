'use client';

import FormButton from "@/components/button";
import Input from "@/components/input";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./action";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductType } from "./schema";
import { useForm } from "react-hook-form";

export default function AddProduct(){
    
    const [preview, setPreview] = useState("");
    const [uploadURL, setUploadUrl] = useState("");
    const [file, setFile] = useState<File|null>(null);
    
    const {register, handleSubmit , 
        formState : {errors}, setValue} = useForm<ProductType>({
        resolver : zodResolver(productSchema),
    });
    
    const onSubmit = handleSubmit(async(data : ProductType) => {

        if(!file){
            return;
        }

        const cloudflareForm = new FormData();
        cloudflareForm.append('file',file);
        const response =    await fetch(uploadURL,{
            method : "post",
            body : cloudflareForm
        });

        if(response.status !== 200){
            return ;
        }
        
        const formData = new FormData();
        formData.append("title",data.title);
        formData.append("price",data.price + "");
        formData.append("description",data.description);
        formData.append("photo",data.photo);
        return uploadProduct(formData);
    });

    const onValid = async() => {
        await onSubmit();
    }
    
    const onImageChange = async(event : React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        const {target : {files}} = event;

        if(!files){
            return;
        }
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
        setFile(file);
        const {success, result} = await getUploadUrl();
        
        if(success){
            const {id , uploadURL} = result;
            setUploadUrl(uploadURL);
            setValue("photo",`https://imagedelivery.net/mEvIrpXl2exuIQ-IaGbeBg/${id}`);
        }
    }
 
    return <div>
        <form className="flex flex-col gap-5 " action={onValid}>
            <label htmlFor="photo" className="border-2 aspect-square
            flex items-center justify-center flex-col text-neutral-300 border-neutral-300
            rounded-md border-dashed cursor-pointer bg-center bg-cover
            "
            style={{
                backgroundImage : `url(${preview})`,
            }}
            >
            {preview === "" ? <>
                <PhotoIcon className="w-15"/>
                <div className="text-neutral-400 text-sm">
                    사진을 추가해주쉐요
                </div>
                </> : null
            }
                
            </label>
            <input onChange={onImageChange} type="file" id="photo" name="photo"
                
            ></input>
            <Input  required placeholder="제목" type="text"
            errors ={[errors.title?.message   ?? ""]} {...register('title')}></Input>
            <Input required placeholder="가격" type="number"
            errors ={[errors.price?.message ?? ""]} {...register('price')}></Input>
            <Input  required placeholder="상세 설명" type="text"
            errors ={[errors.description?.message ?? ""]} {...register('description')}></Input>
            <FormButton text="제출 완료"></FormButton>
        </form>
    </div>
}