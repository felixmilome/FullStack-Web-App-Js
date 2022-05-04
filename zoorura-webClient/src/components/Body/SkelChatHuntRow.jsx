import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const SkelChatHuntRow = () => {
   

  return (
        <> 
        <SkeletonTheme baseColor="#dcdfe3" highlightColor="#ffffff">
          
            <div className= 'z-30 m-auto my-2 flex justify-center items-center rounded-xl sm:h-80 h-64 p-2  text-xs w-5/6 p-1 bg-gray-100 shadow-xl'>
                <div className='m-auto'>


                    <div>
                        <Skeleton circle width={140} height={140}/>
                    </div>
                    
                    <div className='m-auto w-32 break-words my-1 font-bold'>
                        <Skeleton />
                    </div>
                    <div className='m-auto w-32 break-words my-1  font-bold'>
                        <Skeleton height={20} />
                    </div>
                    <div className='m-auto w-32 break-words my-1  font-bold'>
                        <Skeleton height={20} />
                    </div>

                </div>
            </div> 

            </SkeletonTheme>
        </>
      
  )
}

