
import PostBox from "./PostBox";
import {BeatLoader} from "react-spinners";
import {useSelector} from 'react-redux';


function Posts(setDiaryId) { 

const diaries = useSelector((state) => state.diariesReducer);

console.log(diaries);

    return ( 
       <div>
           { !diaries.length ? 

            <div className="p-3 flex">   
                <div className="text-center text-sm text-gray-400 p-3 m-auto bg-transparent rounded-xl">
                    
                    <BeatLoader size={48} color='pink' loading/>
                    <p className= 'text-sm'>fetching diaries..</p>
                    
                </div>
            </div>
            
            : (
                <div>



                    {
                   
                    diaries.map((diary) =>(
                        <PostBox key={diary._id} diary={diary} setDiaryId ={setDiaryId}/>
                    ))
                    }
                </div>
            )
           }

           </div>


   
            
        
   
    )
}

export default Posts;
