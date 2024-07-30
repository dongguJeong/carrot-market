import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(
    getInitialProducts, ['home-products'], {
        revalidate : 60
    }
);

async function getInitialProducts() {
    console.log('hit!!');
    const products = await db.product.findMany({
        select : {
          title : true,
          price : true,  
          created_at : true,
          photo : true,
          id : true,
        },
        
        orderBy:{
            created_at:"desc"
        }
    });
    return products;
}

export const metadata = {
    title : "Home", 
}

//export const dynamic = 'force-dynamic';
export const revalidate = 60;

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

export default async function Products(){
    const initialProducts = await getInitialProducts();

    const revalidate = async() => {
        'use server'
        // /home 과 관련된 모든 캐시 새로 받아옴 
        revalidatePath('/home');
    }
    return(
        <div>
            <ProductList initialProducts={initialProducts}></ProductList>
            <form action={revalidate}>
            <button>Revalidate</button>
            </form>
            <Link href="/products/add" className="bg-orange-500 flex items-center justify-center
                rounded-full size-16 fixed bottom-24 right-8 text-white
                transition-colors hover:bg-orange-400
            ">
                <PlusIcon className="size-10"></PlusIcon>
            </Link>
        </div>
    )
}