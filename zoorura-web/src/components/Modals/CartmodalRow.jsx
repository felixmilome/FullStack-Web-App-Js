
function CartmodalRow ({Src, Product, Price, Time}) {
    return (
        <div className= "items-center text-gray-500 hover:bg-white rounded-md shadow-md cursor-pointer group p-3">
           
        <div className="text-center items-center space-x-2 mt-2">
            {Src && <img src= {Src} alt="caption" className= "inline-flex w-10 h-10 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-md "/>}
           <p className= " text-center text-sm font-bold">
               {Product}</p>
            <p className= "text-center text-sm font-light">
               {Price}</p> 
            <p className= "text-center font-bold text-sm text-gray-500">
               {Time}</p>
            <div className= "text-center rounded-full font-bold text-sm text-gray-400 hover:bg-cyan-400 hover:text-white bg-gray-100 m-1 p-1">
              Remove 
            </div>
        </div>
        
        </div>
       
    )
}

export default CartmodalRow; 

