import { DotsVerticalIcon} from "@heroicons/react/outline";
import {PicForm, AudioForm, VideoForm} from "../Body/PostForms/Previews.jsx";
import { SurePop } from "../Body/SurePop.jsx";


function SentBubble({SentMessage, message, Type, File}) {
    const dateNow = new Date(message.createdOn);
    console.log(dateNow);
    return (
        <div className="relative py-1 bg-transparent space-x-1 flex justify-end items-center">
                    {/* <div className="absolute right-0 top-0 flex justify-center items-center bg-gray-100 rounded-full h-7 w-7 hover:bg-cyan-400 group cursor-pointer">
                        <DotsVerticalIcon className="group-hover:text-white text-gray-300 p-1.5"/>
                    </div>
                    <div className="absolute text-xs font-bold w-fit p-1 left-4 top-0 flex justify-center items-center bg-gray-100 rounded-full  hover:bg-cyan-400 group cursor-pointer">
                        <div>Tip (30)</div>
                    </div>
                    <div className="absolute text-xs font-bold w-fit p-1 left-4 bottom-0 flex justify-center items-center bg-gray-100 rounded-full  hover:bg-cyan-400 group cursor-pointer">
                        <div>Delete</div>
                    </div> */}
           
{/*                 
                <div className="flex justify-center items-center bg-gray-100 rounded-full h-10 w-10 hover:bg-cyan-400 group cursor-pointer">
                    <FontAwesomeIcon icon={faPrayingHands} size ={'2x'} className="group-hover:text-white text-gray-300 p-1.5"/>
                </div> */}
                
                    {/* <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                        <DotsVerticalIcon className="group-hover:text-white text-gray-300 p-1.5"/>
                    </div> */}
                    {message.tipAmount > 0 &&
                     <div className="absolute text-xs text-cyan-400 right-4 top-0 flex justify-center items-center bg-gray-700 rounded p-0.5 w-fit">
                       <p>got:</p>
                       <p className='font-bold'>{message.tipAmount}</p>
                    </div>
                    }
                
           {Type === 'text' &&
            <div className="flex max-w-3/4 justify-end py-1 px-3 text-sm font-light">
        
                <div style={{wordBreak: 'break-word'}} className="my-0 p-3 max-h-screen overflow-scroll  bg-cyan-500 shadow-xl rounded-t-xl rounded-bl-xl bg-gray-100 text-white">
                    
                <p className='font-bold text-xs'>You:</p>
                    
                    {SentMessage.split('\n').map(function(item) {
                        return (
                            <p key={item} >{item}</p> 
                            )
                    })}

                      
                    <div style={{wordBreak: 'break-word'}} className="text-xs text-cyan-200 text-left pt-2">
                                    <p>{dateNow.toDateString()}</p>
                                    <p>{dateNow.toLocaleTimeString()}</p>
                    </div>
                </div>
 
            </div>}
            
              
                    {File?.length > 0 && 
                    
                    <div className="flex w-4/5 h-60 mx-1 my-4 justify-end text-sm font-light  items-center">
                        <div className='bg-transparent '>
                        <p className='text-xs font-light text-center'>You</p>
                            <div style={{wordBreak: 'break-word'}} className=" flex w-full  justify-center my-0 p-0.5 rounded-l-xl rounded-tr-xl  border border-cyan-400  text-white ">

                            
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
                            <div style={{wordBreak: 'break-word'}} className="text-xs text-gray-500 text-left pt-2 pr-2">
                                    <p>{dateNow.toDateString()}</p>
                                    <p>{dateNow.toLocaleTimeString()}</p>       
                            </div>
            
                        </div>
                       

                    </div>} 

            

        </div>
    )
}

export default SentBubble;
