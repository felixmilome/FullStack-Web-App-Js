import { DotsCircleHorizontalIcon} from "@heroicons/react/outline";


import{GiMoneyStack, GiTakeMyMoney} from "react-icons/gi";
import { RiShareForwardBoxLine  } from "react-icons/ri";
import { AiOutlineComment  } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{} from "@fortawesome/free-regular-svg-icons";
import{faComments, faMoneyBillWave, faMoneyBillWaveAlt, faShareSquare,} from "@fortawesome/free-solid-svg-icons";

import TipModal from '../Modals/TipModal.jsx'
import { useState } from 'react';
import PostoptionsModal from "../Modals/PostoptionsModal.jsx";
import OutsideClickHandler from 'react-outside-click-handler';
import ReviewBubble from "./ReviewBubble.jsx";

import moment from 'moment';
function IGbox({diary, setDiaryId}) {

    const[popTip, setpopTip] = useState(false);
    const[popOptions, setpopOptions] = useState(false);

    return (

        // Post-Box
        <div className="p-2 sm:px-12 py-4 rounded-xl bg-transparent relative xl:w-1/2 mx-auto my-1"> 

            {/* Post-Top-Cyan Invisible Parent*/}
            <div className="flex  justify-end">
                {/* Top-Cyan */}
                <div className="bg-gray-100 rounded-t-xl w-full transition delay-50 py-0.5 flex items-center font-bold justify-between">
                        {/*Top-Mid*/}
                        <div className="flex items-center justify-between">
                            {/* Top-Mid Img*/}
                            <div className="ml-3 bg-white rounded-full">
                                <img src="./assets/images/milome.jpeg" alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                            </div> 
                            {/*Top-Mid-Words */}
                            <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                <p className="leading-3 text-sm font-medium my-1 ">@FelixMilome #3</p>
                                <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b>Social Post:  </b>3 hrs Ago</p>
                            
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
                                  hover:text-gray-600 text-gray-300"/>
                    </div>
                            {popOptions && <PostoptionsModal setshowOptions={setpopOptions} diary= {diary} setDiaryId = {setDiaryId}/>}
                            
                        </OutsideClickHandler>   
                
                </div> 

            </div>


        {/* Post Mid Invisible Parent */}
        <div className="bg-gray-100 rounded-b-xl">

        {/* Post Caption Invisible Parent */}
        <div className="flex justify-center bg-gray-100  my-0.5">
            {/* Post Mid Frame*/}
            <div className="w-full lg:w-2/3 text-center items-center p-2 rounded-t-xl"> 
                                {/* <p className="leading-5 text-base font-bold my-1 text-gray-400">IG POST</p> */}
                                <p className="leading-5 text-sm font-base text-gray-700">This is and Embed for a post feel free to use Zoorura Guys it is so awesome my people dont ever stop</p>                 
            </div>  
        </div>

        <div className="flex justify-center bg-gray-100 rounded-b-xl ">
            {/* Post Mid Frame*/}
            <div className="max-h-screen w-full transition delay-50 flex justify-center p-0.5 shadow-md m-3 items-center cursor-pointer bg-gray-200 font-bold hover:bg-gray-300">
            {/* <iframe width="550" height="400" data-tweet-url="https://twitter.com/Donsarigo/status/1459761373202857989" src="data:text/html;charset=utf-8,%3Cblockquote%20class%3D%22twitter-tweet%22%3E%3Cp%20lang%3D%22en%22%20dir%3D%22ltr%22%3EThis%20is%20ethnic%20profiling.%20We%20cannot%20sink%20this%20low.%20%3Cbr%3E%3Cbr%3E%20%3Ca%20href%3D%22https%3A//t.co/asInZmdLDE%22%3Epic.twitter.com/asInZmdLDE%3C/a%3E%3C/p%3E%26mdash%3B%20Dennis%20Onsarigo%20%28@Donsarigo%29%20%3Ca%20href%3D%22https%3A//twitter.com/Donsarigo/status/1459761373202857989%3Fref_src%3Dtwsrc%255Etfw%22%3ENovember%2014%2C%202021%3C/a%3E%3C/blockquote%3E%0A%3Cscript%20async%20src%3D%22https%3A//platform.twitter.com/widgets.js%22%20charset%3D%22utf-8%22%3E%3C/script%3E%0A%3Cstyle%3Ehtml%7Boverflow%3Ahidden%20%21important%3B%7D%3C/style%3E"></iframe> */}
            
           
            {/* DRIVE GOOGLE */}
            {/* <iframe className="lg:w-full" src="https://drive.google.com/file/d/1tzuAapoVoHeKYCJoNo877mkuA06OzaZk/preview"
             width="100%" height="400" allow="autoplay" allowfullscreen="true"></iframe> */}

            {/* TWITCH */}
            {/* <iframe src="https://player.twitch.tv/?channel=diegosaurs&parent=localhost:3000"
             frameborder="0" allowfullscreen="true" scrolling="no"
              height="400" width="100%"></iframe> */}


            {/* INSTAGRAM ==========*/}
            {/* <iframe src="https://www.instagram.com/reel/CWLrjRQIEnu/embed"
            
                                width="360" height="440" frameborder="0" 
                                scrolling="yes" allowtransparency="true">
            </iframe> */}

            {/* YOUTUBE =============*/}
            {/* <div className="relative">
                <div className="absolute bg-red-200 z-50 w-1/2 h-1/2">
                    <p></p>
                    </div> */}
            {/* <iframe width="100%" height="400"
             src="https://www.youtube.com/embed/dmFwB0WEEDY"
              title="YouTube video player"
               frameborder="0"
                allow="accelerometer;
                 autoplay;  clipboard-write;
                  encrypted-media; gyroscope;
                   picture-in-picture" allowfullscreen='true'>
                   </iframe> */}
                   {/* </div> */}

            {/* SOUNDCLOUD =======================*/}
            {/* <iframe  width="100%" height="100%" scrolling="no" frameborder="no"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/uiceheidd/already-dead/&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false">
            </iframe> */}

            {/* PINTEREST============= */}
          

             {/* <iframe src="https://assets.pinterest.com/ext/embed.html?id=601652831476506808"
             height="500" width="300" frameborder="0" scrolling="yes" sandbox ></iframe> */}

            {/*   REDDIT====================== */}

            
       

            {/* <iframe id="reddit-embed" src=" https://www.redditmedia.com/r/synthesizers/comments/qx4g9u/akai_reel_to_reel_serving_as_tape_echo_for_the/?ref_source=embed&amp;ref=share&amp;embed=true"
             sandbox="allow-scripts allow-same-origin allow-popups"
               height="450" width="100%" scrolling="yes">
            </iframe> */}

            {/* Wordpress and Others */}
            {/* <iframe src="https://themillenialnews.wordpress.com/2021/11/05/the-shivering-truth/"
            height="400" width="100%" title="Iframe Example"></iframe> */}

            {/* TIKTOK ==============*/}
            {/* <iframe  
            src="https://www.tiktok.com/embed/7029346062158662913"
             width="290" height="590" frameborder="0"
                                scrolling="no" 
                                allowtransparency="true"
                                allowfullscreen="true" >
            </iframe> */}

            {/* FB ============ */}
            {/* <iframe src="https://www.facebook.com/plugins/video.php?height=200&href=https%3A%2F%2Fwww.facebook.com%2FWeruTV%2Fvideos%2F612650889857740%2F&show_text=false&width=200&" width= "350" height="350" 
                scrolling="yes" frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write;
                encrypted-media; picture-in-picture;
                web-share">
            </iframe> */}

                                {/* TWITFRAME ===========*/}
                               {/* <iframe
                                    border="0"
                                    frameborder="0"
                                    height="420"
                                    width="100%"
                                    scrolling="no"
                                    allowfullscreen="true"
                                    src="https://twitframe.com/show?url=https://twitter.com/Donsarigo/status/1459826847647207427/photo/1">
                                </iframe>  */}
               {/* TWITTER ===================*/}
               {/* <iframe width="100%" height="600" data-tweet-
                src="data:text/html;charset=utf-8,%3Cblockquote%20class%3D%22twitter-tweet%22%3E%%3Ca%20href%3D%22https://twitter.com/MigunaMiguna/status/1460247077603192834/photo/1%3Fref_src%3Dtwsrc%255Etfw%22%3E%3C/a%3E%3C/blockquote%3E%0A%3Cscript%20async%20src%3D%22https%3A//platform.twitter.com/widgets.js%22%20charset%3D%22utf-8%22%3E%3C/script%3E%0A%3Cstyle%3Ehtml%7Boverflow%3Ascroll%20%21important%3B%7D%3C/style%3E"></iframe> */}
                {/* <img src={diary.file} alt="Not Loaded" className="object-container h-full w-full"/>   */}
            </div>     
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
                           
                        <GiTakeMyMoney size ={29} className="text-gray-600"/>
                        <p className="font-light text-xs m-1 text-gray-800">10k Honours</p>
                        
                    </div>   
                    </OutsideClickHandler>
                {/* <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}> */}
                
                {/* </OutsideClickHandler> */}

                {/* Other Icon */}
                <div className="flex items-center rounded-full p-1 cursor-pointer hover:bg-blue-100">
                                <AiOutlineComment  size ={22} className="text-gray-500"/>
                    <p className="font-light text-xs m-1 text-gray-800">0 Reviews</p>
                </div>
                <div className="flex items-center p-1 rounded-full cursor-pointer hover:bg-green-100">
                                 <RiShareForwardBoxLine size ={22} className="text-gray-500"/>
                    <p className="font-light text-xs m-1 text-gray-800">0 Displays</p>
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

export default IGbox;

