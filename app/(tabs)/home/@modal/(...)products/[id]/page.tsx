import ModalBtn from "@/components/modalBtn";
import db from "@/lib/db";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

async function getProduct(id: number) {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return product;
  }

export default async function Modal({ params }: { params: { id: string } }) {
  
   const ID = Number(params.id);
    
  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
      <ModalBtn />
      <div className="max-w-screen-sm h-1/2  flex justify-center w-full">
        <div className="aspect-square  bg-neutral-700 text-neutral-200  rounded-md flex justify-center items-center">
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  );
}