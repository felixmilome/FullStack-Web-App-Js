
import PostBox from "./PostBox";
import {BeatLoader} from "react-spinners";


import {getMiniProfileAction} from "../Midwares/rdx/actions/profileAction.js"
import {getSavedDiariesAction} from "../Midwares/rdx/actions/savedDiariesAction.js"



import IGbox from './IGbox.jsx'
import PostFrame from "./PostFrame";
import { Test } from "./test";

import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';


function Posts(diaryId, setDiaryId) { 
     const dispatch = useDispatch(); 

    const followedDiaries = useSelector((state) => state.diariesReducer); //by default followed followedDiaries
    const popularDiaries = useSelector((state) => state.popularDiariesReducer);
    const randomDiaries = useSelector((state) => state.randomDiariesReducer);


 
console.log(followedDiaries); 


    return (
 
       <div>

            { followedDiaries.length < 1 && followedDiaries.length < 1 && popularDiaries.length < 1 &&

            <div className="p-3 flex ">   
                <div className="text-center text-sm text-gray-400 p-3 m-auto rounded-xl">
                    
                    <BeatLoader size={24} color='pink' loading/>
                    <p className= 'text-sm'>fetching posts..</p>
                    
                </div>
            </div>

            }

            
            {/* FOLLOWED DIARIES */}

            {followedDiaries.length>0 && 
                <div>

                <div className= 'opacity-60 m-auto p-4 flex justify-center items-center text-xs text-white font-light'>
                                        <div className='w-3/4 sm:w-1/4  flex  justify-center  p-3  border-b  items-center'>
                                            <p>Subscription Posts</p>
                                        </div>
                    </div>

                        {
                            
                            followedDiaries.map((diary) =>(

                                    <PostFrame  key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                                     
                            ))
                        } 
                </div>
            }


            {popularDiaries.length>0 && 
                <div>

                    <div className= 'opacity-60 m-auto p-4 flex justify-center items-center text-xs text-white font-light'>
                                        <div className='w-3/4 sm:w-1/4  flex  justify-center   p-3  border-b items-center'>
                                            <p>Popular Posts</p>
                                        </div>
                    </div>

                        {
                            
                            popularDiaries.map((diary) =>(

                                    <PostFrame  key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                                     
                            ))
                        } 
                </div>
            }
             {randomDiaries.length>0 && 
                <div>

                    <div className= 'opacity-60 m-auto p-4 flex justify-center items-center text-xs text-white font-light'>
                                        <div className='w-3/4  sm:w-1/4  flex  justify-center   p-3  border-b  items-center'>
                                            <p>Random Posts</p>
                                        </div>
                    </div>

                        {
                            
                            randomDiaries.map((diary) =>(

                                    <PostFrame  key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                                     
                            ))
                        } 
                </div>
            }

        </div> 
   
    )
}

export default Posts;
