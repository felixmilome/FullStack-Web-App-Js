import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonSimpleRow=()=> {
  return (
    <div className='w-full flex items-center'> 
         <SkeletonTheme baseColor="#dcdfe3" highlightColor="#ffffff">
            <div className='my-0.5 flex items-center p-2 sm:p-4 space-x-4 bg-gray-100 dark:bg-gray-800 rounded'>
                <div>
                    <Skeleton circle width={40} height={40}/>
                </div>

                <div className= 'items-center'>

                    <Skeleton width={200} height={6}/>
                
                </div>
            </div>
           
        </SkeletonTheme>
    
    </div>
       
      
   
  )
}



