export default function Home() {
  return (
   <main className="bg-gray-200 h-screen flex items-center 
   justify-center p-5 sm:bg-gray-200
    md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100
    2xl:bg-purple-100
    ">
    <a>파란 하이퍼링크</a>
    <div className="btn">

      {["Nico","Me","You","Yourself"].map((person,index) => 
        <div key={index} className="flex items-center 
        gap-5  rounded-xl group">
          <div className="size-10 rounded-full bg-blue-400"/>
          <span className="text-lg font-medium">{person}</span>
          <div className="size-6 flex rounded-full bg-red-500
           text-white relative
          items-center justify-center">
            <span className="z-10 group-hover:text-red-500">{index}</span>
            <div className="size-6 bg-red-500 rounded-full animate-ping absolute"></div>
          </div>
        </div>

       
      )}
    </div>
   </main>

   
  );
}
