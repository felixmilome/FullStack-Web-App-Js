import SavedPostsModalRow from './SavedPostsModalRow';
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import {getSavedDiariesAction, deleteSavedDiariesAction} from "../Midwares/rdx/actions/savedDiariesAction.js"
import {Link} from 'react-router-dom'
import{MdOutlineCancel} from 'react-icons/md';
import { DeliveryPop } from "../Modals/DeliveryPop.jsx";



function SavedPostsModal({setPopSaved}) {

const dispatch= useDispatch();
const savedDiaries = useSelector((state) => state.savedDiariesReducer);
const[popDeleted, setPopDeleted] = useState(false);
const[loading, setLoading] = useState(false);
const[popError, setPopError] = useState(false);

 console.log(savedDiaries);

   useEffect(() => {
                    dispatch(getSavedDiariesAction());
            }, [dispatch]);

    const deleteSavedPost = (savedId) =>{

        console.log(savedId);
        setLoading(true);
         dispatch(deleteSavedDiariesAction(savedId, setPopDeleted, setLoading, setPopError));

    }


    return (
        <div className="fixed border-l-8 border-gray-200 p-4 sm:w-1/4 w-2/3 mt-4  sm:mt-2 right-0 sm:right-1.5 rounded-md top-20 h-full z-0 flex justify-center bg-gray-200">
           
         {popDeleted &&     
            <DeliveryPop message='Saved Post Removed'/>
            }
        {popError &&     
            <DeliveryPop message='UnknownError. Try Later'/>
        }
        
        
           
            <div className="overflow-scroll w-full">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowNotifications(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= " mx-3 p-3 space-y-2 rounded-xl  bg-gray-100 items-center mt-4 mb-3">
                    <p className= "text-gray-500 text-center text-sm font-semibold ">Saved Posts</p> 
                </div>  
                
                <div className= "mb-60 w-full  ">
                    
                    {savedDiaries && 
                        <>
                           
                            {
                                
                                savedDiaries.map((savedDiary) =>(
                                <div key= {savedDiary._id} className='relative w-full '>
                                    <Link to={`/DiaryLink/${savedDiary.diaryMiniData._id}`}>
                                        <SavedPostsModalRow  Src = {savedDiary.originalOwnerMiniProfile.dpUrl} PersonName= {savedDiary.originalOwnerMiniProfile.userName}  Note={savedDiary.diaryMiniData.title} savedId={savedDiary.diaryMiniData._id}/>
                                    </Link>
                                    {loading == false ?
                                    <div onClick={()=>deleteSavedPost (savedDiary._id)} className= 'absolute text-gray-400 hover:text-red-400  top-2 right-1 p-1 rounded-md'>
                                        <MdOutlineCancel/>
                                    </div>:
                                    <div className= 'absolute text-gray-500  top-2 right-1 p-1 rounded-md'>
                                    ...
                                    </div>}
                                </div>
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
