
import PostBox from "./PostBox";
import {BeatLoader} from "react-spinners";


import {getMiniProfileAction} from "../Midwares/rdx/actions/profileAction.js"



import IGbox from './IGbox.jsx'
import PostFrame from "./PostFrame";
import { Test } from "./test";

import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';


function Posts(diaryId, setDiaryId) { 
     const dispatch = useDispatch(); 

const diaries = useSelector((state) => state.diariesReducer);
 
console.log(diaries); 


    return ( 
       <div>


            { !diaries.length ?  

            <div className="p-3 flex ">   
                <div className="text-center text-sm text-gray-400 p-3 m-auto rounded-xl">
                    
                    <BeatLoader size={24} color='pink' loading/>
                    <p className= 'text-sm'>fetching posts..</p>
                    
                </div>
            </div>

            : (
                <div>

                    {
                       
                    diaries.map((diary) =>(


                         
                                <PostFrame  key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                            
                         
                    ))
                    } 
                </div>
            )
            }

     
          


           </div>


   
            
        
   
    )
}

export default Posts;
