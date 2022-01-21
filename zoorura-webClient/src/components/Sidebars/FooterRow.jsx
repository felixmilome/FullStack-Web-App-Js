
function FooterRow({Icon, title}) {
    return (
        
        <div className="inline-flex items-center justify-between py-1 px-3 m-1 text-gray-600 hover:bg-cyan-400 rounded-full cursor-pointer group">
           {Icon && <Icon className="h-5 w-5 text-gray-500 group-hover:text-white"/>}
           <p className= "hidden px-1 text-sm sm:inline-flex font-medium text-gray-500 group-hover:text-white">
               {title}</p> 
        </div>
       
    )
}

export default FooterRow; 
