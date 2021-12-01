
import{useState} from 'react';
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


import {useDispatch} from 'react-redux'; 
import { postDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";
import PostFRow from "./PostFRow.jsx";



function PostForm() {

    const [diariesData, setdiariesData] = useState({
        title:'', caption:'', file: '',  publicity:'',
    }); 
   
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const[popPosted, setpopPosted] = useState(false);


    const handleUrl = async (e) =>{
    
          const urInput = await e.target.value;
   

       if(urInput.includes('www.youtube.com') || urInput.includes('//youtu.be') ){
            const fileUrl = urYt (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);
       }
       else if(urInput.includes('www.instagram.com')){
            const fileUrl = urIg (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);
       }
       else if(urInput.includes('www.tiktok.com')){
            const fileUrl = urTk (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);
       }  
       else if(urInput.includes('vm.tiktok.com') || urInput.includes('vt.tiktok.com') ){ //tiktok errr-----------------
       
            setdiariesData({...diariesData, file: urInput});
            console.log(diariesData);
       }
       else if(urInput.includes('twitter.com')){

        const fileUrl = urInput.trim()
        setdiariesData({...diariesData, file: fileUrl});
        console.log(diariesData);
        }
        else if(urInput.includes('soundcloud.com')){

            const fileUrl = urSn (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        else if(urInput.includes('pinterest.com')){

            const fileUrl = urPn (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        else if(urInput.includes('pin.it')){ //pin err--------------

        
            setdiariesData({...diariesData, file: urInput});
            console.log(diariesData);

        }
        else if(urInput.includes('reddit.com')){

            const fileUrl = urRd (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        //========fill these
        else if(urInput.includes('facebook.com')){

            const fileUrl = urFb (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        else if(urInput.includes('drive.google')){

            const fileUrl = urDr (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        else if(urInput.includes('twitch.tv')){

            const fileUrl = urTch (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        else if(urInput.includes('wordpress.com')){

           
            const fileUrl = urInput.trim();
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
        else if(urInput.includes('https://')){

           
            const fileUrl = urInput.trim();
            setdiariesData({...diariesData, file: fileUrl});
            console.log(diariesData);

        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

            try{
                console.log(diariesData);

               // dispatch(postDiariesAction ({...diariesData, name:user?.result?.userName }));
               dispatch(postDiariesAction (diariesData)); 
               
                setpopPosted(true);

                setTimeout( function() {navigate ('/')}, 1000);

            }
            catch(err){

                console.log(err)

            }
            
    }
    return (
        <div className="flex items-center justify-center">

                { popPosted &&
                        <div className=" bg-gray-700 py-4 rounded-full px-20 flex justify-center fixed z-40 m-auto text-center font-bold text-white">
                           <p> Post Added! </p>
                        </div>
                }
               
                <div className="space-y-5 w-full xl:w-2/5 bg-transparent items-center  z-30  m-4">
                        
                       
                       
                        {/* Cyan Heading */}
                        <div className="bg-transparent border-b-2 border-gray-300">
                            <p className="text-center p-3 font-bold text-gray-400 ">Attach Post From</p>
                            <div className ="text-center  items-center p-1 flex flex-wrap text-gray-400 justify-around">
                               <PostFRow sizing={45} Icon={ImYoutube2}/>
                               <PostFRow sizing ={20} Icon={BsInstagram}/>
                               <PostFRow sizing ={20} Icon={SiFacebook}/>
                               <PostFRow sizing ={20} Icon={SiTiktok}/>
                               <PostFRow sizing ={20} Icon={SiTwitter}/>
                               <PostFRow sizing ={20} Icon={RiSoundcloudLine}/>
                 

                            </div>
                            <div className ="text-center  items-center p-1 flex flex-wrap text-gray-400 justify-around">
    
                               <PostFRow sizing ={20} Icon={RiPinterestLine}/>
                               <PostFRow sizing ={20} Icon={ImReddit}/>
                               <PostFRow sizing ={20} Icon={BsTwitch}/>
                               <PostFRow sizing ={20} Icon={ImWordpress}/>
                               <PostFRow sizing ={20} Icon={FaGoogleDrive}/>

                            </div>
                        </div>

                    {/*----- FORM------------------------- */}
                    <form onSubmit={handleSubmit}>
                        <div className= "flex justify-center items-center p-0.5">
                            <img src="./assets/images/milome.jpeg" alt="DP" className="rounded-full h-7 w-7"/>
                        
                        <select 
                        name= "publicity"
                        value= {diariesData.publicity}
                        onChange={(e)=> setdiariesData({...diariesData, publicity: e.target.value})}
                        
                        className="m-2 flex text-center justify-center items-center font-semibold text-xs text-gray-100 outline-none bg-gray-300 rounded-full p-1 border-none">
                            <option value="public"> Public </option>
                            <option value="subscribers">My Subscribers </option>
                            <option value="private"> Private/Only Me </option>
                        </select> 
                        </div>
                        <div className="">


                            
                   


                            {/* File Upload------------ */}

                                    {/* <div className= "items-center bg-gray-100 rounded-full p-3 text-gray-300 mx-auto w-20 h-20">
                                    
                                    <FileBase
                                        
                                        type="file"
                                        multiple={false}
                                        onDone={({base64})=> setdiariesData ({...diariesData, file:base64})}
                                        
                                    />
                                        <CameraIcon className="m-auto h-10 w-10"/>
                                        <p className= "text-center text-xs font-base text-gray-400">Photo</p>
                                    </div> */}


                                {/*-- URL------------ */}
                                    <div className="flex justify-center">
                                        <input name= "file"
                                       //value= {diariesData.file}
                                        //onChange={(e)=> setdiariesData({...diariesData, file: e.target.value})}
                                        onChange={handleUrl}
                                        placeholder="Paste Url Here" className="rounded-full text-center text-gray-700 font-medium outline-none  mx-4 my-3 w-full px-4 p-1 sm:py-2 border border-gray-400 bg-gray-200"/>
                                    </div>




                    {/*========== ========Preview Box ===========*/}
                                    
                                {/* ======YOUTUBE======== */}
                                  { diariesData.file.length && diariesData.file.includes('www.youtube.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <ImYoutube2 size={40}/>
                                           </div>
                                            <p className= 'text-center  text-gray-400 p-1 text-xs' >Youtube Attachment</p>
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                 <YtForm Url= {diariesData.file}/>
                                                 <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Youtube Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                           
                                        </>
                                    }
                                    {/* ======INSTAGRAM======== */}
                                     { diariesData.file.length && diariesData.file.includes('www.instagram.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                                <BsInstagram/>
                                                
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Instagram Attachment</p>
                                            <div className="relative flex justify-center m-auto w-full p-2 lg:p-0">
                                                <IgForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Instagram Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                    {/* ======TIKTOK======== */}
                                    { diariesData.file.length && diariesData.file.includes('www.tiktok.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                                <SiTiktok/>
                                            </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Tiktok Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                                 <TkForm Url= {diariesData.file}/>
                                                 <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Tiktok Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                    {/* tiktok app */}
                                    { diariesData.file.length && diariesData.file.includes('vm.tiktok.com') || diariesData.file.includes('vt.tiktok.com') ?
                                            <div >
                                            <div className='relative flex justify-center text-gray-400'>
                                                <SiTiktok/>
                                            </div>
                                          
                                            <p className= 'text-center text-red-400 p-1 text-xs' >Apologies. Tiktok Id not found. fetch Tiktok Link from <b>WEB-BROWSER</b> and <b>NOT APP</b></p>
                                            </div>
                                       : 
                                       <>
                                          
                                        </>
                                    }
                                    {/* ======Twitter======== */}
                                    { diariesData.file.length && diariesData.file.includes('twitter.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <SiTwitter/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Twitter Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <TwForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Tweet...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                       {/* ======SOUNDCLOUD======== */}
                                       { diariesData.file.length && diariesData.file.includes('soundcloud.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <RiSoundcloudLine/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Soundcloud Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <SnForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Soundcloud Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                         
                                        </>
                                    }
                                     {/* ======PINTEREST======== */}
                                     { diariesData.file.length && diariesData.file.includes('pinterest.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <RiPinterestLine/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Pinterest Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <PnForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Pin...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                            
                                        </>
                                    } 
                                    
                                            {/* pin app */}
                                            { diariesData.file.length && diariesData.file.includes('pin.it')?
                                                    <div >
                                                    <div className='relative flex justify-center text-gray-400'>
                                                        <RiPinterestLine/>
                                                    </div>
                                                
                                                    <p className= 'text-center text-red-400 p-1 text-xs' >Apologies! Pin Id not found. Kindly fetch Pinterest Link from Web-Browser ADDRESS BAR</p>
                                                    </div>
                                            : 
                                            <>
                                                   
                                                </>
                                            }
                                            
                                     {/* ======REDDIT======== */}
                                     { diariesData.file.length && diariesData.file.includes('www.reddit')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <RiRedditFill/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Reddit Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <RdForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Reddit Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                         
                                        </>
                                    }
                                       {/* ======FACEBOOK======== */}
                                       { diariesData.file.length && diariesData.file.includes('facebook.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <SiFacebook/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Facebook Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <FbForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Facebook Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {/* ======GOOGLE DRIVE======== */}
                                     { diariesData.file.length && diariesData.file.includes('drive.google.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <FaGoogleDrive/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Google Drive Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <FbForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Google Drive File...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                         
                                        </>
                                    }
                                     {/* ======TWITCH======== */}
                                     { diariesData.file.length && diariesData.file.includes('player.twitch.tv')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <BsTwitch/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Twitch Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <TchForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Twitch Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                           
                                        </>
                                    }
                                     {/* ======WORDPRESS======== */}
                                     { diariesData.file.length && diariesData.file.includes('wordpress.com')?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <ImWordpress/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Wordpress Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <WpForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Wordpress Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                       
                                        </>
                                    }
                                      { diariesData.file.length && diariesData.file.includes('https://')
                                      && !diariesData.file.includes('www.youtube.com')
                                      && !diariesData.file.includes('www.instagram.com')
                                      && !diariesData.file.includes('www.tiktok.com')
                                      && !diariesData.file.includes('twitter.com')
                                      && !diariesData.file.includes('www.soundcloud.com')
                                      && !diariesData.file.includes('redditmedia.com')
                                      && !diariesData.file.includes('www.facebook.com')
                                      && !diariesData.file.includes('drive.google.com')
                                      && !diariesData.file.includes('player.twitch.com')
                                      && !diariesData.file.includes('wordpress.com')
                                      && !diariesData.file.includes('pin.it')
                                      && !diariesData.file.includes('vt.tiktok.com')
                                      && !diariesData.file.includes('vm.tiktok.com')
                        
                                      ?
                                        <div >
                                            <div className='flex justify-center text-gray-400'>
                                           <CgWebsite/>
                                           </div>
                                            <p className= 'text-center text-gray-400 p-1 text-xs' >Website Attachment</p>
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <WpForm Url= {diariesData.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Webpage...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                        
                                        </>
                                    }





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
                                        placeholder=" Enter Caption" className="resize-none h-28 sm:h-32 text-gray-700 font-light outline-none  m-1 w-full  px-4 py-2 border-2 border-gray-300 rounded-md bg-gray-200"/>
                                    </div>
                                    
                                {/* Button------------- */}
                                    <button type='submit' className="items-center mx-auto bg-gradient-to-r from-pink-300 to-cyan-400 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-1/3 rounded-full
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold p-1">
                                       Post
                                    </button>

                            
                        
                            

                        </div>
                        </form>
        </div>
        </div>
    )
}

export default PostForm;