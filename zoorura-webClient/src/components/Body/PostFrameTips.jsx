import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getTipsAction } from '../Midwares/rdx/actions/tipsAction';
import { getWalletAction } from '../Midwares/rdx/actions/walletAction';

export const PostFrameTips = ({diaryId, userId, setpopTip}) => {

    const tippersAll = useSelector((state) => state.tipsReducer);
   
    const dispatch = useDispatch(); 

    const availableTippers = tippersAll.filter(tipper => tipper.tippedPostId === diaryId);
   
    useEffect(() => {     
       
        if(!availableTippers.length){
            
            dispatch(getTipsAction(diaryId));    
        }

    }, [dispatch]);
    
    useEffect(() => {
      
            dispatch(getWalletAction()); 
       
    }, []); 


    //const availableTippers = tippersAll.filter(tipper => tipper.tippedPostId === diaryId);


    return (
        <div className ='h-28 '>
        <div className='flex max-h-28 text-xs text-gray-600 dark:text-gray-200  z-30 top-6 left-0 max-w-1/2 absolute overflow-scroll'>
                      
                    
                    
                    <div className="border border-gray-300 p-2 mx-auto h-full bg-gray-200 dark:bg-gray-900 rounded"> 
                    {availableTippers && availableTippers.length > 0 &&
                        availableTippers.map((tipper) =>(
                            <div className= "p-0.5"> 
                                <p>@{tipper.tipperMiniProfile.userName} : <b> {tipper.amount} zbx</b></p>
                            </div>
                            ))
                        }  
                         {availableTippers && availableTippers.length === 0 &&
                      
                            <div className= "p-0.5"> 
                                <p>Select a number(amount) to tip</p>
                            </div>
                        
                        }                    
                        </div>

        </div>
        </div>
    )
}