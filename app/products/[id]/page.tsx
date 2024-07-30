import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

async function getProduct(id : number){
   const product = db.product.findUnique({
     where :{
        id ,
     },
     include : {
        user : {
            select : {
                username : true,
                avatar : true,
            }
        }
     }
   });
   return product;
}

async function getProductTitle(id : number){
    const product = db.product.findUnique({
      where :{
         id ,
      },
      select : {
        title : true
      }
      
    });
    return product;
 }

 const getCachedProduct = nextCache(getProduct, 
    ['product-detail'], {
        tags : ['product-detail'],
});

 
 const getCachedProductTitle = nextCache(getProductTitle, 
    ['product-title'], {
        tags : ['#food',"#foodie","여러가지가 가능해요",'중복도 되요','product-title'],
});

async function getIsOwner(id : number){
    // const session = await getSession();
    // if(session.id){
    //     return session.id === id;
    // }
    return false;
}

export async function  generateMetadata({params} : {
    params : {id : string}
}){ 
    const product = await getCachedProductTitle(Number(params.id));
    return {
        title : product?.title,
    }
}

export default async function ProdctDetail({params} : {
    params : {id : string}
}){
    const id = Number(params.id);
    if(isNaN(id)){
        return notFound();
    }
    const product = await getCachedProduct(id);

    if(!product){
        return notFound();
    }

    const isOwner = await getIsOwner(id);

    const deleteProduct = async() => {
        'use server'
        await db.product.delete({
            where : {
                id ,
            },
            select : null,
        });
        redirect("/products");
    }

    const revalidate = async() => {
        'use server'
        revalidateTag('product-detail');
    }
    return (
        <div className="">
            <div className="relative aspect-square w-2/4">
                <Image  fill src={`${product.photo}/public`} className="object-cover"  
                        alt={product.title} 
                        />
            </div>
            <div className="p-5 flex items-center gap-3
            border-b border-neutral-600">
                <div className="size-10 rounded-full overflow-hidden">
                    {product.user.avatar ?  
                    <Image src={product.user.avatar} width={40} height={40} alt="avatar"/>
                    : <UserIcon className="size-10 rounded-sm"/>
                    }
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between
                items-center
            ">
                <span className="font-semibold">{formatToWon(product.price)}원</span>
                
                <form action={revalidate}>
                <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
                    Revalidate title cache</button>
                </form>  

                <Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>채팅하기</Link>
            </div>
        </div>
    )
}


export async function generateStaticParams(){
    const products = await db.product.findMany({
        select : {
            id : true,
        }
    })
    return products.map(product=> ({id : product.id + ""}));
}