import {useParams} from "react-router-dom";
import {getADiaryAction} from '../../Midwares/rdx/actions/diariesAction.js'
import{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostFrame from '../PostFrame.jsx';
import {BeatLoader} from "react-spinners";

export const DiaryLink = ({setDiaryId}) => {

  const {diaryId} = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
  
      dispatch(getADiaryAction(diaryId));
    
  }, []);

  const visitedDiaries = useSelector((state) => state?.visitedDiariesReducer);
  const user = JSON.parse(localStorage.getItem('profile'));
  const diaries = visitedDiaries?.filter((diaryItem)=> diaryItem?._id ===diaryId);
  console.log({visitedDiaries});

 
  return (
    <>
        {diaries?.length>0 ?
            <>
                { diaries.map((diary) =>(

                  <div> 
                   { !user.result.blocked.includes(diary.creator) && !user.result.blockers.includes(diary.creator) && 
                    <PostFrame  key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId} params ='link'/> 
                   }
                  </div>  
                                
                  ))
                } 
            </>
            : 
            <div className="p-3 flex ">   
            <div className="text-center text-sm text-gray-400 p-3 m-auto rounded-xl">     
                <BeatLoader size={24} color='pink' loading/>
            </div>
            </div>  

        }
    </>
  )}

