function ProfilemodalRow ({Icon,title}) {
    return (
        
        <div className="z-30 items-center flex space-x-1 justify-start m-3 bg-transparent py-1 px-5  hover:bg-cyan-500 rounded-full cursor-pointer group">
           <div className="p-2 bg-gray-100 rounded-full items-center flex justify-center">
               {Icon && <Icon className="h-5 w-5 m-auto "/>}
            </div>
           <p className= "inline-block px-1 text-sm sm:inline-flex font-medium  group-hover:text-white">
               {title}</p> 
               
        </div>
        
    )
}

export default ProfilemodalRow;
