function PostOptionsRow({Icon, title, amount}) {
    return (
        <div>
            <div className="z-30 items-center flex space-x-1 justify-start m-3 bg-transparent py-1 px-5 text-gray-600 hover:bg-cyan-500 rounded-full cursor-pointer group">
            <div className="p-2 bg-gray-200 rounded-full items-center flex justify-center">
                {Icon && <Icon className="h-5 w-5 m-auto text-gray-500"/>}
                </div>
            <p className= "inline-block px-1 text-sm sm:inline-flex font-medium text-gray-500 group-hover:text-white">
                {title}
                </p> 
               {amount && amount.length > 0 && <div className='bg-yellow-500 rounded-full w-5 h-5 p-1 items-center flex justify-center text-white'>
                    <p className= 'text-xs'>{amount}</p>
                </div> }    
            </div>
        </div>
    )
}

export default PostOptionsRow;
