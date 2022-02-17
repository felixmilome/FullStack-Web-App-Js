import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getTipsAction } from '../Midwares/rdx/actions/tipsAction';

export const PostFrameTips = ({diaryId, userId}) => {

    const tippersAll = useSelector((state) => state.tipsReducer);
   
    const dispatch = useDispatch(); 

    const availableTippers = tippersAll.filter(tipper => tipper.tippedPostId === diaryId);
   
    useEffect(() => {     
       
        if(!availableTippers.length){
            
            dispatch(getTipsAction(diaryId));    
        }

    }, [dispatch]); 


    //const availableTippers = tippersAll.filter(tipper => tipper.tippedPostId === diaryId);


    return (
        <div className='flex max-h-full text-xs text-gray-600  z-30 top-1 left-0 max-w-1/2 absolute overflow-scroll'>
                    <div className=" border border-gray-300 p-2 mx-auto h-full bg-gray-200 rounded"> 
                    {availableTippers && availableTippers.length > 0 &&
                        availableTippers.map((tipper) =>(
                            <div className= "p-0.5"> 
                                <p>@{tipper.tipperMiniProfile.userName} : <b> {tipper.amount}</b></p>
                            </div>
                            ))
                        }                    
                        </div>

        </div>
    )
}