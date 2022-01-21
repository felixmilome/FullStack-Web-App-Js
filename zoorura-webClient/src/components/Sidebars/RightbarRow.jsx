
function RightbarRow({Src, title, PersonName, Points}) {
    return (
        <div>
           
        <div className="items-center space-x-2 mt-0.5 p-2 text-gray-500 hover:bg-white rounded-l-full rounded-tr-full shadow-md cursor-pointer  group">
            {Src && <img src= {Src} alt="dp" className= "hidden sm:inline-flex w-10 h-10 p-0.5 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>}
           <p className= "sm:inline-flex text-sm font-bold">
               {title}</p>
            <p className= "sm:inline-flex text-sm font-light">
               {PersonName}</p> 
            <p className= "sm:inline-flex font-bold text-sm text-gray-500">
               {Points}</p>
        </div>
        </div>
       
    )
}

export default RightbarRow; 
