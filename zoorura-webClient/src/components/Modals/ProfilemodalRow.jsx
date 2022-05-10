import{GiMoneyStack} from 'react-icons/gi';
function ProfilemodalRow ({Icon,title, walletAmount}) {
    return (
        <>

        <div className="z-30 items-center flex space-x-1 justify-start m-3 bg-transparent py-1 px-1  hover:bg-cyan-500 dark:hover:bg-cyan-800 rounded-full cursor-pointer group">
           <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full items-center flex justify-center">
               {Icon && <Icon className="h-5 dark:text-gray-200 w-5 m-auto "/>}
            </div>
           <p className= "inline-block px-1 text-sm sm:inline-flex font-medium  group-hover:text-white">
               {title}</p> 

              
               
        </div> 

        {walletAmount && 
        <div className=' text-gray-500'>
          <div className= "flex items-center  justify-center space-x-2 text-xs font-normal">
                <div className='border border-gray-400  rounded-full p-1'>
                    <GiMoneyStack size={20}/>
                </div>
                <p>Balance</p>
        </div> 
        <div className='w-full flex justify-center'>
        <div className= 'text-left border-l ml-10 w-30 text-xs space-y-1 border-gray-400 bg-transparent rounded-md pl-4'>

          

            <div className= "flex text-sm ">
               <p className="font-bold"> Zbx</p> 
               <p>: {walletAmount.zbx}</p>
            </div> 
            <div className= "flex font-light ">
               <p className="font-semibold"> Usd</p> 
               <p>: {walletAmount.usd}</p>
            </div> 
            <div className= "flex  font-light ">
               <p className="font-semibold"> Kshs</p> 
               <p>: {walletAmount.kshs}</p>
            </div> 
             {/* <div className= "flex  font-light ">
               <p className="font-semibold"> Ugx</p> 
               <p>: {walletAmount.ugx}</p>
            </div> 
            <div className= "flex  font-light ">
               <p className="font-semibold"> Tzs</p> 
               <p>: {walletAmount.tzs}</p>
            </div>  */}
           
          
        </div>
        </div>
        </div>}

      </>
        
    )
}

export default ProfilemodalRow;
