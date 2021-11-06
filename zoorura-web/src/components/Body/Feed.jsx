import { PlusIcon } from "@heroicons/react/outline";

import Posts from "./Posts.jsx";
import CreatediaryModal from "../Modals/CreatediaryModal.jsx";
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
function Feed() {

    const[popCreatediary, setpopCreatediary] = useState(false);
    const[diaryId, setDiaryId] = useState(null);
    return (
    
    <div className="overflow-y-scroll">
                    
                    
    
        
                <div className="flex justify-center">
                {/* Button */}  
                    <OutsideClickHandler onOutsideClick={() => {setpopCreatediary(false);}}>
                        
                            <div className="bg-gradient-to-r bg-gray-700 hover:from-pink-500 hover:to-yellow-500 flex justify-around mx-4 mt-2 sm:mt-4 py-2 text-sm px-5 items-center cursor-pointer  font-bold rounded-full shadow-xl"
                                onClick={ () => {setpopCreatediary(!popCreatediary)}}>
                                <PlusIcon className="p-0.5 h-6 text-white"/>
                                <p className="text-white">Diary Post</p>
                            </div>
                            <div className="flex bg-red-300 justify-center">
                                {popCreatediary && <CreatediaryModal diaryId ={diaryId} setDiaryId ={setDiaryId}/>}
                            </div>
                    </OutsideClickHandler>
               
                </div>

               
                
        
       <Posts diaryId={diaryId}/>
      
        
    </div>
    )
}

export default Feed;
