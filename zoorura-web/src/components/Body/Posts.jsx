
import PostBox from "./PostBox";
import {BeatLoader} from "react-spinners";
import {useSelector} from 'react-redux';


import IGbox from './IGbox.jsx'
import PostFrame from "./PostFrame";
import { Test } from "./test";


function Posts(diaryId, setDiaryId) { 

const diaries = useSelector((state) => state.diariesReducer);

console.log(diaries);

    return ( 
       <div>


            { !diaries.length ? 

            <div className="p-3 flex">   
                <div className="text-center text-sm text-gray-400 p-3 m-auto bg-transparent rounded-xl">
                    
                    <BeatLoader size={24} color='pink' loading/>
                    <p className= 'text-sm'>fetching posts..</p>
                    
                </div>
            </div>

            : (
                <div>

                    {
                
                    diaries.map((diary) =>(
                        
                        // <Test key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>

                      <PostFrame key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                        // <PostBox key={diary._id} diary={diary} setDiaryId ={setDiaryId}/>
                    ))
                    }
                </div>
            )
            }

           {/* <IGbox/> */}
          


           </div>


   
            
        
   
    )
}

export default Posts;
