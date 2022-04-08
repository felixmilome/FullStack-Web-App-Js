
function LeftbarmobRow({Src, title, PersonName, Points}) {
    return (
        <div>
           
        <div className="items-center space-x-2 mt-0.5 py-0.5 px-2  bg-cyan-100  hover:bg-white border-b-2 border-gray-300 cursor-pointer group">
            {Src && <img src= {Src} alt="dp" className= "inline-flex w-10 h-10 p-0.5 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>}
           <p className= "inline-flex text-sm font-bold">
               {title}</p>
            <p className= "inline-flex text-sm font-light">
               {PersonName}</p> 
            <p className= "inline-flex font-bold text-sm ">
               {Points}</p>
        </div>
        </div>
       
    )
}

export default LeftbarmobRow; 
