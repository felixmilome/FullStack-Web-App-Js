

export const CallPair =({myVideo, stream, userVideo})=> {
  return (
    <div className='fixed flex items-center h-screen  w-screen top-0 left-0 z-50 bg-transparent dark:bg-gray-800 w-screen h-screen'>
           <div className="relative flex w-full items-center"> 

                    <div className= "bg-gray-100 dark:bg-gray-900 items-center m-auto w-screen h-screen rounded-xl p-1 text-center border border-gray-300"> 
                        <div className="flex justify-around text-white dark:text-gray-900 items-center pt-4 m-auto">
                           {stream && <video ref={myVideo} autoplay/>}
                        </div>
                    </div> 

                    <div className= "absolute top-0 right-0 bg-gray-100 dark:bg-gray-900 items-center m-auto w-5/6 sm:w-1/4 rounded-xl p-1 text-center border border-gray-300"> 
                        <div className="flex justify-around text-white dark:text-gray-900 items-center pt-4 m-auto">
                            <video ref={userVideo} autoplay/>
                        </div>
                    </div>          
            
            </div>  

    </div>
  )
}