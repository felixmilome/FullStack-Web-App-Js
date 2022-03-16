import { DotsVerticalIcon} from "@heroicons/react/outline";
import {PicForm, AudioForm, VideoForm} from "../Body/PostForms/Previews.jsx";

function SentBubble({SentMessage, Type, File}) {
    return (
        <div className="py-1 bg-transparent space-x-1 flex justify-end items-center">
{/*                 
                <div className="flex justify-center items-center bg-gray-100 rounded-full h-10 w-10 hover:bg-cyan-400 group cursor-pointer">
                    <FontAwesomeIcon icon={faPrayingHands} size ={'2x'} className="group-hover:text-white text-gray-300 p-1.5"/>
                </div> */}
                
                    <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                        <DotsVerticalIcon className="group-hover:text-white text-gray-300 p-1.5"/>
                    </div>
                
           {Type === 'text' &&
            <div className="flex max-w-3/4 justify-end py-1 px-3 text-sm font-light">
        
                <div style={{wordBreak: 'break-word'}} className="my-0 p-3  bg-cyan-500 shadow-xl rounded-t-xl rounded-bl-xl bg-gray-100 text-white">
                    
                    
                    <p>{SentMessage}</p>

                      
                    <div style={{wordBreak: 'break-word'}} className="text-xs text-cyan-200 text-right pt-2">
                    <p>14.4.23, 4.32 pm</p>
                    </div>
                </div>
 
            </div>}
            
              
                    {File?.length > 0 && 
                    
                    <div className="flex w-4/5 justify-end text-sm font-light">
                        <div className='bg-transparent'>
                            <div style={{wordBreak: 'break-word'}} className=" flex w-full  justify-center my-0 p-0.5 rounded-l-xl rounded-tr-xl  bg-cyan-500 text-white">

                            
                                        {Type ==='video' &&
                                            <VideoForm Url={File}/>
                                        }
                                          {Type ==='audio' &&
                                            <AudioForm Url={File}/>
                                        }
                                         {Type ==='image' &&
                                            <PicForm Url={File}/>
                                        }
                                    
                                
                            
                            </div>
                            <div style={{wordBreak: 'break-word'}} className="text-xs text-gray-500 text-right pt-2 pr-2">
                                    <p>14.4.23, 4.32 pm</p>
                            </div>
            
                        </div>
                    

                    </div>}

            

        </div>
    )
}

export default SentBubble;
