
function LeftbarRow({Src, title, PersonName, Points}) {
    return (
        <div>
           
            <div className=" flex justify-center sm:justify-start bg-gray-200 items-center space-x-2 mt-0.5 py-2 px-2  rounded-l-full  hover:bg-gray-100 border-b border-gray-300 cursor-pointer group">
                {Src && <img src= {Src} alt="dp" className= "inline-flex w-9 h-9 p-1 bg-white group-hover:bg-teal-400 cursor-pointer object-cover rounded-full "/>}
            <p className= "sm:inline-flex text-sm font-bold">
               #{title}</p>
                <p className= "sm:inline-flex text-sm font-light">
                {PersonName}</p> 
                <p className= "sm:inline-flex font-bold text-sm ">
                {Points} aps</p>
            </div>
        </div>
       
    )
}

export default LeftbarRow; 
