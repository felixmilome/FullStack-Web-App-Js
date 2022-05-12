import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import{useState} from 'react';



export const SkelChatHuntRow = () => {
    const[mode, setMode] = useState(null);

    const modeSetter =()=> {
        if (
            //localStorage.theme === 'dark' || (!('theme' in localStorage) &&       //localstorage.createItem use this 
        window.matchMedia('(prefers-color-scheme: dark)').matches
        //)
        ) {
            //document.documentElement.classList.add('dark') //work on it later
            setMode('dark'); 
        } else {
            //document.documentElement.classList.remove('dark')
            setMode('dark');
        } 
    }
   

  return (
        <> 
         <SkeletonTheme baseColor= "#ffffff" highlightColor="#00ffff"> 
       
          
            <div className= 'z-30 m-auto my-2 flex justify-center items-center rounded-xl sm:h-80 h-64 p-2  text-xs w-5/6 p-1 bg-gray-100 dark:bg-gray-900 shadow-xl'>
                <div className='m-auto'>


                    <div>
                        <Skeleton circle width={140} height={140}/>
                    </div>
                    
                    <div className='m-auto w-32 break-words my-1 font-bold'>
                        <Skeleton />
                    </div>
                    <div className='m-auto w-32 break-words my-1  font-bold'>
                        <Skeleton height={6} />
                    </div>
                    <div className='m-auto w-32 break-words my-1  font-bold'>
                        <Skeleton height={6} />
                    </div>

                </div>
            </div> 

            </SkeletonTheme>
        </>
      
  )
}

