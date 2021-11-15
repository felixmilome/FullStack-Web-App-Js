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

               
                 {/* EMBEDS */}
                {/* <div className= "flex justify-center bg-transparent m-3">
                        <div className="mx-auto space-y-3 bg-transparent">
                            <div className="flex bg-transparent justify-center">
                                <iframe src="https://www.tiktok.com/embed/7029346062158662913"
                                width="300" height="600" frameborder="0"
                                scrolling="no" 
                                allowtransparency="true"></iframe>
                            </div>
                            <div className="m-auto">
                                <iframe src="https://www.instagram.com/reel/CWLrjRQIEnu/embed"
                                width="400" height="600" frameborder="0" 
                                scrolling="no" allowtransparency="true">
                                </iframe>
                            </div>
                        </div>
                </div> */}
        
       <Posts diaryId={diaryId}/>
      
        
    </div>
    )
}

export default Feed;
