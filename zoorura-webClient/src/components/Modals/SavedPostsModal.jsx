import SavedPostsModalRow from './SavedPostsModalRow';
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import {getSavedDiariesAction} from "../Midwares/rdx/actions/savedDiariesAction.js"



function SavedPostsModal({setPopSaved}) {

const dispatch= useDispatch();
const savedDiaries = useSelector((state) => state.savedDiariesReducer);
console.log(savedDiaries);

   useEffect(() => {
                    dispatch(getSavedDiariesAction());
            }, [dispatch]);


    return (
        <div className="fixed border-l-8 border-gray-200 p-4 sm:w-1/4 w-2/3 mt-4  sm:mt-2 right-0 sm:right-1.5 rounded-md top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowNotifications(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-cyan-500  bg-gray-100 items-center mt-4 mb-3 group">
                    <p className= "text-gray-500 text-center text-sm font-semibold group-hover:text-white">Saved Posts</p> 
                </div>  
                
                <div className= "mb-60 ">
                    
                    {savedDiaries && 
                        <>
                           
                            {
                                
                                savedDiaries.map((savedDiary) =>(
                            
                                <SavedPostsModalRow key= {savedDiary._id} Src = {savedDiary.originalOwnerMiniProfile.dpUrl} PersonName= {savedDiary.originalOwnerMiniProfile.userName}  Note={savedDiary.diaryMiniData.title}/>
                                
                                ))
                            } 
                        
                        </>
                }
              
                </div>
                
            </div>

        </div> 
    )
}

export default SavedPostsModal;
