export default function Home() {
  return (
   <main className="bg-gray-200 h-screen flex items-center 
   justify-center p-5 
   dark:bg-gray-700">
    <div className="bg-white w-full shadow-lg rounded-3xl p-5
    max-w-screen-sm dark:bg-gray-600">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-300">In transit</span>
          <span className="text-4xl font-semibold -mb-1 dark:text-white">Coolblue</span>
        </div>
        <div className="rounded-full bg-orange-400 size-12"></div>
       
      </div>
      <div className="my-2 flex items-center gap-2">
        <span className="bg-green-400 text-white uppercase 
        px-2.5 py-1.5 text-xs font-medium rounded-full transition hover:bg-green-500 hover:scale-125 ">
          Today</span>
        <span className="dark:text-gray-100">9:30-10:30u</span>
      </div>
      <div>
        <div className="relative my-2">
          <div className="bg-gray-200 w-full rounded-full h-2 absolute"/>
          <div className="bg-green-400 w-2/3 rounded-full h-2 absolute"/>
        </div>
        <div className=" text-sm font-normal flex justify-between items-center
          text-gray-500 dark:text-gray-100
        ">
          <span className="pt-4">Expected</span>
          <span className="pt-4"> Sorting center</span>
          <span className="pt-4">In transit</span>
          <span className="pt-4 text-gray-400 dark:text-gray-500">Delivered</span>
        </div>
      </div>  
    </div>
   </main>
  );
}
