
import{useState, useEffect } from 'react';
//import FileBase from 'react-file-base64';

import {useNavigate} from 'react-router-dom';

import { urIg, urTk, urYt, urSn, urPn, urRd, urFb, urDr, urTch } from "../Midwares/cleaners/cleaner.js";

import{BsInstagram, BsTwitch} from "react-icons/bs";
import{RiSoundcloudLine, RiPinterestLine, RiRedditFill} from "react-icons/ri";
import{ImReddit, ImWordpress, ImYoutube2} from "react-icons/im";
import{SiFacebook, SiTiktok, SiTwitter} from "react-icons/si";
import { FaGoogleDrive } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import {FbForm, IgForm, PnForm, RdForm, SnForm, TchForm, TkForm, TwForm, WpForm, YtForm} from "./PostForms/Previews.jsx";


import {useDispatch, useSelector} from 'react-redux'; 
import { patchDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";
import PostFRow from "./PostFRow.jsx";




function PostEdit({diary, setpopOptions}) {

    //const diary = useSelector((state)=> postId ? state.diariesReducer.find((d)=> d._id=== postId): null);

    // const originalDiaryObj = useState({
    //     title:diary.title, caption:diary.caption, publicity:diary.publicity
    // }); 
    const [diariesData, setdiariesData] = useState({
        title:diary.title, caption:diary.caption, publicity:diary.publicity
    }); 
    const[popPosted, setpopPosted] = useState(false);
    const[spam, setSpam] = useState(false);
    const[loading, setLoading] = useState(false);
   
    const dispatch = useDispatch();

    const navigate = useNavigate();

    
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);

            try{
                console.log(diariesData);

                dispatch(patchDiariesAction(diary._id, diariesData, setpopPosted, setSpam)); 
               
                

            }
            catch(err){

                console.log(err)

            }
             
    }
    return (
        <div className="flex items-center justify-center">

                { popPosted &&
                        <div className=" bg-gray-700 py-4 top-28 rounded-full px-20 flex justify-center fixed z-40 m-auto text-center font-bold text-white">
                           <p> Post Updated! </p>
                        </div>
                    }
                    { spam ==true &&
                        <div className=" bg-gray-700 py-4 top-28 rounded-full px-20 flex justify-center fixed z-40 m-auto text-center font-bold text-white">
                           <p> Posting Limit reached(10)! Try Tomorrow </p>
                        </div>
                    }
               
                <div className="space-y-5 w-full bg-transparent items-center  z-30  m-4">
                        
                       
                       
                        {/* Cyan Heading */}
                        <div className="bg-transparent border-b-2 border-gray-300">
                            <p className="text-center text-sm font-bold ">Edit This Post</p>
                            <p className="text-center text-sm font-light ">(Only title and Caption allowed)</p>
                          
                        </div>

                    {/*----- FORM------------------------- */}
                    <form onSubmit={handleSubmit}>
                     
                        <div className="">


                                {/* Publicity --------*/}
                                <div className= "flex justify-center items-center p-0.5">
                                    <select 
                                    name= "publicity"
                                    value= {diariesData.publicity}
                                    onChange={(e)=> {

                                        setdiariesData({...diariesData, publicity: e.target.value});
                                        console.log(diariesData.publicity);
                                    
                                    }}
                                    
                                    className="m-2 flex text-center justify-center items-center font-light text-xs text-gray-600 outline-none bg-gray-200 rounded-full p-1 border-none">
                                        <option value="public"> Public </option>
                                        <option value="subscribers">My Subscribers </option>
                                        <option value="private"> Private/Only Me </option>
                                    </select> 
                                </div>


                                {/*-- Title------------ */}
                                <div className="flex justify-center">
                                <input name= "title"
                                value= {diariesData.title}
                                onChange={(e)=> setdiariesData({...diariesData, title: e.target.value})}
                                placeholder="Enter Title" className="text-gray-700 font-medium outline-none  mx-4 my-3 w-full px-4 p-1 sm:py-2 border-2 border-gray-300 rounded-md bg-gray-200"/>
                            </div>
                            {/* ---Content---------------  */}
                            <div className="px-3 items-center flex justify-center">
                                <textarea name= "caption"
                                value= {diariesData.caption}
                                onChange={(e)=> setdiariesData({...diariesData, caption: e.target.value})}
                                placeholder=" Enter Caption" className="resize-none h-14 sm:h-24 text-gray-700 font-light outline-none  m-1 w-full  px-4 py-2 border-2 border-gray-300 rounded-md bg-gray-200"/>
                            </div>

                            
                        {/* Button------------- */}
                            {loading ===false && (diary.title !== diariesData.title || diary.caption !== diariesData.caption || diary.publicity !== diariesData.publicity)
                                && diariesData.title.length < 50 && diariesData.caption.length < 500
                                && diariesData.title.length > 0 && diariesData.caption.length > 0 &&
                                <button type='submit' className="items-center mx-auto border border-cyan-400
                            my-3 flex
                            mx-auto w-1/3 rounded-full
                                my-2 justify-center 
                                cursor-pointer
                                font-semibold p-1 hover:bg-white">
                                Edit Post
                            </button>}
                            
                            {loading ===true && <button type='button' className="items-center mx-auto border border-cyan-400
                            my-3 flex
                            mx-auto w-1/3 rounded-full
                                my-2 justify-center 
                                cursor-pointer
                                font-semibold p-1 text-gray-400 hover:bg-white">
                                Editting...
                            </button>}

                             
                        
                            

                        </div>
                </form>
        </div>
        </div>
    )
}

export default PostEdit;