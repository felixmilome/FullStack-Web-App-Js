
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faPrayingHands} from "@fortawesome/free-solid-svg-icons";
import {PicForm, AudioForm, VideoForm} from "../Body/PostForms/Previews.jsx";

function  ReceivedBubble({ReceivedMessage, Type, File}) {
    return (
        <div className="mx-1 p-0.5 bg-transparent flex justify-start items-center">
           
           {/* <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                <TrashIcon className="group-hover:text-white text-gray-300 p-1"/>
            </div>    */}
            {Type === 'text' &&
            <div className="flex justify-start max-w-3/4 bg-transparent p-0.5 sm:w-2/3">
                    <div className="rounded-full bg-pink-100">
                        <div className="flex justify-start p-1 text-sm font-light">
                            <div style={{wordBreak: 'break-word'}}  className="p-3 max-w-xs  bg-gray-100 rounded-t-xl rounded-br-xl bg-gray-100 text-gray-600">
                                <p>{ReceivedMessage}</p>
                                <div style={{wordBreak: 'break-word'}} className="text-xs text-gray-400 text-right pt-2">
                                <p>14.4.23, 4.32 pm</p>
                                </div>
                             </div>
                        </div>
                        
                    </div>
            </div>}

            {File?.length > 0 && 
                    
                    <div className="flex w-4/5 justify-start text-sm font-light">
                        <div className='bg-transparent'>
                            <div style={{wordBreak: 'break-word'}} className=" flex w-full  justify-center my-0 p-0.5 rounded-r-xl rounded-tl-xl  bg-pink-100 text-white">

                            
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




            <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                <FontAwesomeIcon icon={faPrayingHands} size ={'2x'} className="group-hover:text-white text-gray-300 p-1.5"/>
            </div>

            

        </div>
        
    )
}

export default ReceivedBubble;
