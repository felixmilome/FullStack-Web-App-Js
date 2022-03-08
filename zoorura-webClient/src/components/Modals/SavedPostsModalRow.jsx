
function SavedPostsModalRow ({Src, title, PersonName, Note, Time}) {
    return (
        <div className= "items-center text-gray-500 hover:bg-white rounded-md shadow-md cursor-pointer group p-3">
           
        <div className="flex text-xs sm:text-sm items-center space-x-2 mt-2 ">
            {Src && <img src= {Src} alt="dp" className= "inline-flex w-10 h-10 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>}
           <div className="space-x-1">
               <p className= "inline-flex font-bold">
               {title}</p>
            <p className= "inline-flex font-light">
               {PersonName}</p> 
            <p className= "sm:inline-flex font-bold text-gray-500">
               {Time}</p>
            <p className= "sm:text-center font-bold text-gray-400">
               {Note}</p>
               </div>
        </div>
        </div>
       
    )
}

export default SavedPostsModalRow; 
