
function SubscribersmodalRow ({Src, title, PersonName, Time}) {
    return (
        <div className="w-full flex items-center text-xs">
           
        <div className="flex justify-start w-full items-center space-x-3 mt-2 p-2 text-gray-500 hover:bg-white rounded-md shadow-md cursor-pointer group">
            {Src && <img src= {Src} alt="dp" className= "w-10 h-10 p-0.5 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>}
          <div className="items-center">

              <div className="flex space-x-2 items-center"> 
                    <p className= "font-bold">
                     {title}</p>
                       <p className= "font-light">
                      {PersonName}</p> 
                </div>

                <p className= "inline-flex  text-gray-500">
                {Time}</p>
            </div>
            
        </div>
        </div>
       
    )
}

export default SubscribersmodalRow; 
