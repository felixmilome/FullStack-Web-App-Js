
function LeftbarRow({Src, title, PersonName, Points}) {
    return (
        <div>
           
            <div className=" flex justify-start bg-gray-200 items-center space-x-2 mt-0.5 py-2 px-2  rounded-l-full  hover:bg-white border-b border-gray-300 cursor-pointer group text-sm">
                {Src && <img src= {Src} alt="dp" className= "inline-flex w-9 h-9 p-0.5 bg-white group-hover:bg-cyan-400 cursor-pointer object-cover rounded-full "/>}
            <p className= "sm:inline-flex font-bold">
               #{title}</p>
                <p className= "sm:inline-flex font-light">
                {PersonName}</p> 
                <p className= "sm:inline-flex font-bold ">
                {Points} points</p>
            </div>
        </div>
       
    )
}

export default LeftbarRow; 
