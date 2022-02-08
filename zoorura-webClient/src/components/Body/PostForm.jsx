
import{useState} from 'react';
//import FileBase from 'react-file-base64';

import {useNavigate} from 'react-router-dom';

import { urIg, urTk, urYt, urSn, urPn, urRd, urFb, urDr, urTch } from "../Midwares/cleaners/cleaner.js";

import{BsInstagram, BsTwitch, BsFileEarmarkImageFill} from "react-icons/bs";
import{RiSoundcloudLine, RiPinterestLine, RiRedditFill} from "react-icons/ri";
import{ImReddit, ImWordpress, ImYoutube2} from "react-icons/im";
import{SiFacebook, SiTiktok, SiTwitter} from "react-icons/si";
import { FaGoogleDrive } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import {MdFileUpload, MdOutlineUploadFile, MdVideoLibrary,MdLibraryMusic, MdPictureAsPdf } from "react-icons/md";
import {FbForm, IgForm, PnForm, RdForm, SnForm, TchForm, TkForm, TwForm, WpForm, YtForm, PicForm, AudioForm, VideoForm, PdfForm} from "./PostForms/Previews.jsx";


import {useDispatch} from 'react-redux'; 
import { postDiariesAction, getDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";
import PostFRow from "./PostFRow.jsx";

import VideoPlayer from 'react-video-js-player'

import * as yup from "yup";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

//firebase
import {storage} from "../Midwares/firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

const postSchema = yup.object().shape({
    title: yup.string().strict(false).trim().required('Title required').max(50),
    caption: yup.string().strict(false).trim().required('Caption required').max(500),
});

function PostForm() {

    const [diariesData, setdiariesData] = useState({
        title:'', caption:'', file: '',  publicity:'',
    }); 
   const[imageBlob, setImageBlob] = useState('');
   const[mediaType, setMediaType] = useState('');
   const[fileData, setFileData] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile')); 

    const[popPosted, setpopPosted] = useState(false);

    const [progress, setProgress] = useState(0);
    const[attachment, setAttachment] = useState('link');
    const[types, setTypes] = useState({image:'image', audio:'audio', video:'video', pdf:'pdf' });

 const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(postSchema),
    });

    
   

    // const handleImage = async (e)=>{
    //     e.preventDefault();
    //     const image = e.target.files[0];
    //     console.log(image);
    //     uploadImage(image);
            
    // };

    const reader = new FileReader();



function readFile(input, type) {

    let file = input;
    setFileData(file);
    setMediaType(type);
    setImageBlob(URL.createObjectURL(file));
    console.log(imageBlob);
    console.log(type);
 
    // reader.readAsArrayBuffer(file);

    // reader.onload = function() {

    //     console.log('result:'+ reader.result); 
    //     setImageBlob(reader.result);
    //     setMediaType(type);
    //     console.log(type);

    // };
  
    // reader.onerror = function() {
    //   console.log('error :'+ reader.error);
    // };
}


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

    const getDiaries = async()=>{
        dispatch(getDiariesAction()); 
    }

    const uploadLink = async (url)=>{


       const constructor = async(url) => {

            const diariesDataConstruct = {
                    title: diariesData.title,
                    caption: diariesData.caption,
                    file: url,
                    image: '',
                        publicity: diariesData.publicity};

                return diariesDataConstruct;

            }

           try{ 
           
                const diariesData = await constructor (url);
                console.log(diariesData);

              dispatch(postDiariesAction (diariesData, setpopPosted, navigate, getDiaries)); 

            }
            catch(err){

                console.log(err)

            }
    }
    const uploadLinkPost = async ()=>{
 
            try{ 
            
                 console.log(diariesData);
 
               dispatch(postDiariesAction (diariesData, setpopPosted, navigate, getDiaries)); 
 
             }
             catch(err){
 
                 console.log(err)
 
             }
     }
    

    const uploadFile = async (image) =>{
            if (!image) return;
            const storageRef = ref (storage, `/diaryfiles/${image.name}`);
            const uploadTask=uploadBytesResumable(storageRef,image);
        
            uploadTask.on("state-changed", (snapshot)=>{
                const prog = Math.round(
                    (snapshot.bytesTransferred/ snapshot.totalBytes)* 100
                    );
                setProgress(prog);
            },
            (err) => console.log(err),
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url)=> {
            
                setdiariesData({...diariesData, file: url});
                uploadLink(url);
                console.log(url);
              
                
                })
            }

        );
       
    };

    const post = (data)=>{
        

        if (imageBlob.includes('blob')){

         uploadFile(fileData);

             
        } else {
            uploadLinkPost();
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
                        <div className="bg-transparent border-b border-gray-300">
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
                    <form onSubmit={handleSubmit(post)}>
                        <div className= "flex justify-center items-center p-0.5">
                            <img src="./assets/images/milome.jpeg" alt="DP" className="rounded-full h-7 w-7"/>
                        
                        <select 
                        name= "publicity"
                        value= {diariesData.publicity}
                        onChange={(e)=> setdiariesData({...diariesData, publicity: e.target.value})}
                        
                        className="m-2 flex text-center justify-center items-center font-light text-xs text-gray-600 outline-none bg-gray-200 rounded-full p-1 border-none">
                            <option value="public"> Public </option>
                            <option value="subscribers">My Subscribers </option>
                            <option value="private"> Private/Only Me </option>
                        </select> 
                        </div>
                        <div className="">

                            <div className= 'flex w-full bg-transparent'>
                                <div className='flex m-auto space-x-4'>

                                   { attachment === 'link' &&
                                        <>
                                            <div className= ' items-center border border-gray-400 rounded-full  text-xs py-1 px-2 bg-gray-500 text-white' >
                                                link Site
                                            </div>
                                            <div onClick ={(e)=> setAttachment('file')} className= ' items-center bg-transparent border border-gray-400 rounded-full text-gray-500 text-xs py-1 px-2 cursor-pointer hover:bg-gray-500 hover:text-white' >
                                            <div className= 'items-center flex'>
                                                <MdFileUpload/>
                                                    Attach File
                                                </div>
                                            </div>
                                        </>
                                    }

                                    {attachment === 'file' &&
                                        <>
                                            <div onClick ={(e)=> {
                                                setAttachment('link');
                                                setImageBlob('');
                                        }} className= ' items-center bg-transparent border border-gray-400 rounded-full text-gray-500 text-xs py-1 px-2 cursor-pointer hover:bg-gray-500 hover:text-white' >
                                                link Site
                                            </div>

                        
                                            <div className= 'items-center border border-gray-400 rounded-full  text-xs py-1 px-2 bg-gray-500 text-white'>
                                                <div className= 'items-center flex'>
                                                       Attach File
                                                </div>
                                            </div>
                                       
                                        </>
                                    }

                                </div>
                            </div>


                            
                   


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
                                    {attachment === 'link' &&
                                    <div className="flex justify-center">
                                        <input name= "file"
                                       //value= {diariesData.file}
                                        //onChange={(e)=> setdiariesData({...diariesData, file: e.target.value})}
                                        onChange={handleUrl}
                                        placeholder="Paste Url Here (Optional)" className="rounded-full text-center text-gray-700 font-light outline-none  mx-4 my-3 w-full px-4 p-1 sm:py-2 border border-gray-300 bg-gray-100"/>
                                    </div>
                                    }
                                 {/*-- FILE------------ */}
                                 {attachment === 'file' && 
                                    <div className= 'w-full flex justify-around'>
                                    

                                       {/* UPLOAD INPUTS */}

                                        <input onChange={(e)=>readFile(e.target.files[0], types.image)}
                                         className= "hidden" id='ImageUpload' type="file"/> 

                                        <input onChange={(e)=>readFile(e.target.files[0], types.video)}
                                         className= "hidden" id='VideoUpload' type="file"/> 

                                        <input onChange={(e)=>readFile(e.target.files[0], types.audio)}
                                         className= "hidden" id='AudioUpload' type="file"/> 
                                        
                                        <input onChange={(e)=>readFile(e.target.files[0], types.pdf)}
                                         className= "hidden" id='PdfUpload' type="file"/> 
         
                                          {/* <input onChange={(e)=>{ 
                                            setImageBlob(reader.readAsText(e.target.files[0]));
                                            setFileData(e.target.files[0]);
                                            setMediaType('pdf');
                                            console.log(imageBlob);
                                        }} className= "hidden" id='PdfUpload' type="file"/> 

                                          <input onChange={(e)=>{ 
                                            setImageBlob(reader.readAsText(e.target.files[0]));
                                            setFileData(e.target.files[0]);
                                            setMediaType('audio');
                                            console.log(imageBlob);
                                        }} className= "hidden" id='AudioUpload' type="file"/> 

                                          <input onChange={(e)=>{ 
                                            setImageBlob(reader.readAsText(e.target.files[0]));
                                            setFileData(e.target.files[0]);
                                            setMediaType('video');
                                            console.log(imageBlob);
                                        }} className= "hidden" id='VideoUpload' type="file"/>  */}


                                        {/* LABELSSSS */}

                                        <label htmlFor= 'ImageUpload' className='py-3'>
                                                    <div onClick ={(e)=>{
                                                        setProgress(0);
                                                       
                                                        }}className= 'm-auto items-center  hover:bg-gray-400 hover:text-white  rounded-md  text-xs font bg-gray-100 border border-gray-300 text-gray-400 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-sm m-auto bg-transparent p-1'>
                                                            <BsFileEarmarkImageFill size={20}/> 
                                                         Image
                                                        </div>
                                                        
                                                        
                                                    </div>
                                        </label>

                                        <label htmlFor= 'PdfUpload' className='py-3'>
                                                    <div onClick ={(e)=>{
                                                        setProgress(0);
                                                       
                                                        }}className= 'm-auto items-center  hover:bg-gray-400 hover:text-white  rounded-md  text-xs font  bg-gray-100 border border-gray-300 text-gray-400 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-sm m-auto bg-transparent p-1'>
                                                            <MdVideoLibrary size={20}/> 
                                                         Video
                                                        </div>          
                                                    </div>
                                        </label>
                                      
                                         <label htmlFor= 'AudioUpload' className='py-3'>
                                                    <div onClick ={(e)=>{
                                                        setProgress(0);
                                                      
                                                        }}className= 'm-auto items-center  hover:bg-gray-400 hover:text-white  rounded-md  text-xs font  bg-gray-100 border border-gray-300 text-gray-400 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-sm m-auto bg-transparent p-1'>
                                                            <MdLibraryMusic size={20}/> 
                                                         Audio
                                                        </div>
                                                    </div>
                                        </label>
                                      

                                         <label htmlFor= 'PdfUpload' className='py-3'>
                                                    <div onClick ={(e)=>{
                                                        setProgress(0);
                                                       
                                                        }}className= 'm-auto items-center  hover:bg-gray-400 hover:text-white  rounded-md  text-xs font bg-gray-100 border border-gray-300 text-gray-400 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-sm m-auto bg-transparent p-1'>
                                                            <MdPictureAsPdf size={20}/> 
                                                         Pdf
                                                        </div>
                                                    </div>
                                        </label>
                                       
                                    </div>
                                }

                     



                    {/*========== ========Preview Box ===========*/}

                                        {/* =======MEDIAS ===========*/}
                                     {imageBlob.length && imageBlob.includes('blob') && mediaType === 'image'?
                                        <div >
                                          
                                            <div className="relative flex justify-center m-auto w-full p-2 lg:p-0">
                                                <PicForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {imageBlob.length && imageBlob.includes('blob') && mediaType === 'pdf' ?
                                        <div >
                                          
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                <PdfForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {imageBlob.length && imageBlob.includes('blob') && mediaType === 'audio' ?
                                        <div >
                                          
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                <AudioForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {imageBlob.length && imageBlob.includes('blob') && mediaType === 'video' ?
                                        <div >
                                          
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                <VideoForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                    
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
                                      && !diariesData.file.includes('firebasestorage.googleapis.com')
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
                                    <div className="flex justify-right">
                                        <div className='w-4/5'>
                                        <input name= "title"
                                        value= {diariesData.title} 

                                        {...register('title',{
                                        onChange: (e) => {setdiariesData({...diariesData, title: e.target.value})}
                                        })}  
                        
                                        placeholder="Enter Title" className="text-gray-700 font-light outline-none  mx-3 my-1 w-full px-4 p-1 sm:py-2 border border-gray-300 rounded-md bg-gray-100"/>
                                         <p className='mx-3 text-xs text-red-700 font-light' >{errors.title?.message}</p>
                                        </div>
                                    </div>
                                {/* ---Content---------------  */}
                                    <div className="px-3 items-center flex justify-center">
                                        <div className='w-full'>
                                        <textarea name= "caption"
                                        value= {diariesData.caption} 

                                         {...register('caption',{
                                        onChange: (e) => {setdiariesData({...diariesData, caption: e.target.value})}
                                        })}   
                        
                                        placeholder="Enter Caption" className="resize-none h-28 sm:h-32 text-gray-700 font-light outline-none  mt-1 w-full  px-4 py-2 border border-gray-300 rounded-md bg-gray-100"/>
                                        <p className='text-xs text-red-700 font-light' >{errors.caption?.message}</p>
                                        </div>
                                    </div>
                                    
                                {/* Button------------- */}
                                    <button type='submit' className="items-center mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-1/3 rounded-md
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold p-1">
                                        {progress ===0 ?<p>Post</p>:
                                      <p>Uploading: {progress}%</p>}
                                    </button>

                            
                            
                            

                        </div>
                        </form>
        </div>
      
        </div>
    )
}

export default PostForm;