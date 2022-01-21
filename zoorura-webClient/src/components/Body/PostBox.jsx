import { DotsCircleHorizontalIcon} from "@heroicons/react/outline";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faComments, faShareSquare, faPrayingHands} from "@fortawesome/free-solid-svg-icons";
import TipModal from '../Modals/TipModal.jsx'
import { useState } from 'react';
import PostoptionsModal from "../Modals/PostoptionsModal.jsx";
import OutsideClickHandler from 'react-outside-click-handler';
import ReviewBubble from "./ReviewBubble.jsx";

import moment from 'moment';
function PostBox({diary, setDiaryId}) {

    const[popTip, setpopTip] = useState(false);
    const[popOptions, setpopOptions] = useState(false);

    return (

        // Post-Box
        <div className="p-2 sm:px-12 py-4 rounded-xl bg-transparent relative xl :w-1/2 mx-auto my-1"> 

            {/* Post-Top-Cyan Invisible Parent*/}
            <div className="flex  justify-center">
                {/* Top-Cyan */}
                <div className="bg-gradient-to-r from-teal-300 to-blue-400 rounded-l-full w-full rounded-t-md transition delay-50 py-0.5 flex items-center font-bold shadow-lg justify-between">
                        {/*Top-Mid*/}
                        <div className="flex items-center justify-between">
                            {/* Top-Mid Img*/}
                            <div className="ml-3 bg-white rounded-full">
                                <img src="./assets/images/milome.jpeg" alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                            </div> 
                            {/*Top-Mid-Words */}
                            <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                <p className="leading-3 text-sm font-medium my-1 ">@FelixMilome #3</p>
                                <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b>Social Post:  </b>{moment (diary.time).fromNow()}</p>
                            
                            </div>
                        </div>
                    {/* Top-Menu */}
                    <div>
                    
                    </div>
                    <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopOptions(false);
                            }}
                            >
                            <div className="h-10 w-10 m-1 
                            rounded-full flex justify-around
                             items-center bg-transparent"
                            onClick={ () => 
                            {setpopOptions(!popOptions)}
                            }>
                                <DotsCircleHorizontalIcon className=" h-8 w-8
                                 items-center cursor-pointer
                                  hover:text-cyan-200 text-gray-600"/>
                    </div>
                            {popOptions && <PostoptionsModal setshowOptions={setpopOptions} diary= {diary} setDiaryId = {setDiaryId}/>}
                            
                        </OutsideClickHandler>   
                
                </div> 

            </div>

        {/* Post Caption Invisible Parent */}
        <div className="flex justify-center  my-0.5">
            {/* Post Mid Frame*/}
            <div className="w-full items-center p-5 bg-transparent rounded-t-xl"> 
                                <p className="leading-5 text-base font-medium my-1 text-gray-500">{diary.title}</p>
                                <p className="leading-5 text-sm font-light text-gray-700">{diary.caption}</p>                 
            </div>  
        </div>

        {/* Post Mid Invisible Parent */}
        <div className="flex justify-center">
            {/* Post Mid Frame*/}
            <div className="max-h-screen transition delay-50 flex p-1 mx-3 items-center cursor-pointer bg-gray-200 font-bold hover:bg-gray-300">
                <img src={diary.file} alt="Not Loaded" className="object-container h-full w-full"/>  
            </div>     
        </div>

        {/*Bottom Icon invisible Parent*/}
        <div className="">
            {/* Post Bottom Icons*/}
            <div className="w-full  justify-around transition delay-50 flex items-center  bg-transparent border-b-2 border-gray-300 font-bold p-3">
            <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}>
            {popTip && <TipModal />}
                    
                    <div className="relative flex items-center rounded-full p-1 cursor-pointer bg-gradient-to-r hover:bg-cyan-100 hover:from-blue-100 hover:to-green-100"
                        onClick={ () => {setpopTip(!popTip)}}>
                           
                        <FontAwesomeIcon icon={faPrayingHands} size ={'2x'} className="text-cyan-400 p-1" />
                        <p className="font-light text-xs m-1 text-gray-800">{diary.tips} Claptips</p>
                        
                    </div>   
                    </OutsideClickHandler>
                {/* <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}> */}
                
                {/* </OutsideClickHandler> */}

                {/* Other Icon */}
                <div className="flex items-center rounded-full p-1 cursor-pointer hover:bg-blue-100">
                    <FontAwesomeIcon icon={faComments} size ={'2x'} className="text-blue-400 p-1.5"/>
                    <p className="font-light text-xs m-1 text-gray-800">{diary.reviews} Reviews</p>
                </div>
                <div className="flex items-center p-1 rounded-full cursor-pointer hover:bg-green-100">
                    <FontAwesomeIcon icon={faShareSquare} size ={'2x'} className="text-green-400 p-1.5"/>
                    <p className="font-light text-xs m-1 text-gray-800">{diary.displays} Displays</p>
                </div>
            </div> 

            {/* Opinion Box */}

            <div className="p-3 bg-transparent border-b-2 border-gray-300">
                            {/* Comment Box */}
                            <div className="w-full items-center">
                                <textarea type="text" placeholder="Write Review Here..." className="max-h-screen w-full text-gray-700 font-medium outline-none bg-gray-100 text-sm rounded-md p-3"/>
                            </div>
                            <ReviewBubble Src= "./assets/images/beyonce.jpeg" Name="@Beyonce" Review="Wow Milome"/>
                            <ReviewBubble Src= "./assets/images/jayz.jpeg" Name="@Hover" Review="Wow Milome I am jealous. He knows how to invest and can give you anything you ask for or want He is a good friend of mine. hhddfjkbdfhjbdfhkbdfhjbdfjhbdjfhbdfjhbkbdjhbjhbhjbjhbjhbjhbbfsjhkb jknbjbnj jnkbnkj huihiuhuihi uhiuhiuhiuh h
                            hahahahahahah"/>
                </div>

        </div>
    </div>
    )
}

export default PostBox;

