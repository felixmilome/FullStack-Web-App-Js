import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import{useState} from 'react';

export const SkeletonPostRow=()=> {

  return (
     
     
    <div className='w-full items-center'>
         
         <SkeletonTheme baseColor= "#ffffff" highlightColor="#00ffff">
        <div className='mx-auto space-y-2 text-black px-8 sm:px-16 py-8 rounded-md sm:rounded-xl bg-gray-100 dark:bg-gray-800 relative w-full sm:w-3/4 xl:w-2/5 mx-auto mb-6 bg-gray-100'>
           
            <div className ='flex  space-x-4 items-center'>
                <div>
                    <Skeleton circle width={40} height={40}/>
                </div>

                <div className= 'items-center'>
                    <Skeleton width={180} height={6}/>
                    <Skeleton width={180} height={6}/>
                </div>
            </div>

            <div>
                <Skeleton height={6}/>
            </div>
            <div className='pb-4'>
                <Skeleton height={6}/>
            </div>

        </div>
        </SkeletonTheme>
    
    </div>
       
      
   
  )
}

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// export const SkeletonPostRow=()=> {
//   return (
//     <div className='w-full flex justify-center items-center'>
        
//         <div className='flex justify-center text-black p-2 sm:px-12 py-4 rounded-md sm:rounded-xl bg-gray-100 relative w-full sm:w-3/4 xl:w-2/5 mx-auto mb-6 bg-gray-100'>
           
//             <div>
//                 <Skeleton circle width={10} height={10}/>
//             </div>
//             <div className= 'items-center'>
//                 <Skeleton />
//                 <Skeleton />
//             </div>
//         </div>
      
//     </div>
//   )
// }

