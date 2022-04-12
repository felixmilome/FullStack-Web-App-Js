
import{useState, useEffect} from 'react';
//import FileBase from 'react-file-base64';

import {useNavigate} from 'react-router-dom';

import { urIg, urTk, urYt, urSn, urPn, urRd, urFb, urDr, urTch } from "../Midwares/cleaners/cleaner.js";

import{BsInstagram, BsTwitch, BsFileEarmarkImageFill, BsLink45Deg, BsFileEarmarkMinus} from "react-icons/bs";
import{RiSoundcloudLine, RiPinterestLine, RiRedditFill} from "react-icons/ri";
import {BiUnlink} from 'react-icons/bi';
import {BeatLoader} from "react-spinners";
import{BsFillEmojiLaughingFill} from 'react-icons/bs';

import{ImReddit, ImWordpress, ImYoutube2} from "react-icons/im";
import{SiFacebook, SiTiktok, SiTwitter} from "react-icons/si";
import { FaGoogleDrive } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import {MdFileUpload, MdOutlineUploadFile, MdVideoLibrary,MdSearch, MdLibraryMusic, MdPictureAsPdf } from "react-icons/md";
import {FbForm, IgForm, PnForm, RdForm, SnForm, TchForm, TkForm, TwForm, WpForm, YtForm, PicForm, AudioForm, VideoForm, PdfForm} from "./PostForms/Previews.jsx";


import {useDispatch, useSelector} from 'react-redux'; 
import { postDiariesAction, getDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";
import { searchMiniProfileAction } from "../Midwares/rdx/actions/profileAction.js";
import PostFRow from "./PostFRow.jsx"; 

import VideoPlayer from 'react-video-js-player'

import * as yup from "yup";
import axios from 'axios';

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

//firebase
import {storage} from "../Midwares/firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { PostFormTagSearch } from './PostFormTagSearch.jsx';
import Picker from 'emoji-picker-react';

//Search Area: textarea title



function PostForm() {
    const [tagObjArray, setTagObjArray] = useState([])
    const [tagArray, setTagArray] = useState([])
    const [spam, setSpam] = useState(false)
    const [diariesData, setdiariesData] = useState({
        title:'', caption:'', file: '', media: '', type: 'diary',  publicity:'', tags:[]
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

    const [searchingName, setSearchingName] = useState(false);
    const [searchedName, setSearchedName] = useState('');
    const [searchError, setSearchError] = useState(false);
    
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [emojiBox, setEmojiBox] = useState(false);



    const[types, setTypes] = useState({image:'image', audio:'audio', video:'video', pdf:'pdf' });

    const searchedMiniProfile = useSelector((state) => state.getMiniProfileReducer);
   
  
    
    const postSchema = yup.object().shape({
        title: yup.string().strict(false).trim().required('Title required').max(50),
        caption: yup.string().strict(false).trim().required('Caption required').max(500),
        url:yup.string().nullable().notRequired().when('url', {
                is: (value) => value?.length,
                then:(rule)=> rule.matches(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm, "invalid Url").min(11, 'Url too short').max(700, 'Url too long'),
                }),
        ImageUpload: yup.mixed().nullable().notRequired().when('ImageUpload', {
            is: (value) => value?.length,
            then:(rule)=> rule.test("fileSize", "Image Size is too large. (Must be below 10MB)", (value) => {
                console.log(value[0].size);
                return value[0].size <= 10000000;
              })
              .test("fileType", "Unsupported Image Format (Must be png/jpeg/jpg)", (value) =>{
                console.log(value[0].type);
                return ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
              }),
            }),
        VideoUpload: yup.mixed().nullable().notRequired().when('VideoUpload', {
            is: (value) => value?.length,
            then:(rule)=> rule.test("fileSize", "Video Size too large. (Must be below 150MB)", (value) => {
                console.log(value[0].size);
                return value[0].size <= 150000000;
                })
                .test("fileType", "Unsupported Image Format (Must be png/jpeg/jpg)", (value) =>{
                    console.log(value[0].type);
                    return ["video/mp4","video/mpeg", "video/ogg", "video/webm"].includes(value[0].type);
                }), 
            }),
        AudioUpload: yup.mixed().nullable().notRequired().when('AudioUpload', {
            is: (value) => value?.length,
            then:(rule)=> rule.test("fileSize", "Audio Size too large. (Must be below 30MB)", (value) => {
                console.log(value[0].size);
                return value[0].size <= 30000000;
                })
                .test("fileType", "Unsupported Audio Format (Must be mp3/ogg/wav)", (value) =>{
                
                    console.log(value[0].type);
                    return ["audio/mp3","audio/mpeg", "audio/ogg", "audio/wav"].includes(value[0].type);
              
                }),
            }),
      
            
            },
                
            [
                ['url', 'url'],
                ['ImageUpload', 'ImageUpload'],
                ['AudioUpload', 'AudioUpload'],
                ['VideoUpload', 'VideoUpload'],
            ]
        );

    const {register, handleSubmit, formState: {errors}} = useForm({
            resolver: yupResolver(postSchema),
        });

    
   
    const onEmojiClick = (event, emojiObject) => {
        
        setChosenEmoji(emojiObject);
        setdiariesData({...diariesData, caption: diariesData.caption+emojiObject.emoji+' '})
    };

    const clearUrl = ()=> {
        //Useeffect cleared Url.value  
        setdiariesData({...diariesData, media:'', file:''});
        setAttachment('file')
    }
    const clearUrl_NoSwitch = ()=> {
        //Useeffect cleared Url.value  
        setdiariesData({...diariesData, media:'', file:''});
        document.getElementById('url').value = '';
     
}


    useEffect(() => {
        if(attachment==='link'){
            document.getElementById('url').value = '';
        }
    }, [attachment]);

    // useEffect(() => {
    //     if(searchedMiniProfile.userName?.length>0){
    //     setSearchError(false);
    //     }
    // }, []);







function clearInput (){
    console.log(imageBlob);
    setProgress(0);

    // if(document.getElementById('url').value.length>0){
    //     document.getElementById('url').value = '';
    // };
    if(document.getElementById('ImageUpload').value.length){
        document.getElementById('ImageUpload').value = '';
    };
    if(document.getElementById('VideoUpload').value.length){
        document.getElementById('VideoUpload').value = '';
    };
    if(document.getElementById('AudioUpload').value.length){
        document.getElementById('AudioUpload').value = '';
    };
    // if(document.getElementById('PdfUpload').value.length){
    //     document.getElementById('PdfUpload').value = '';
    // };
   
   

    setFileData('');
    setdiariesData({...diariesData, file:'', media: ''});
    setImageBlob('');
    console.log(diariesData);
}


function readFile(file, type) {


// //BLOB------

    
    setFileData(file);
    setdiariesData({...diariesData, media:type});

   if(file){
    setImageBlob(URL.createObjectURL(file));
   }
    
    console.log(imageBlob);
    console.log(type);






// Reader-----

    // let file = input;
    // setFileData(file);
 
    // reader.readAsDataURL(file);

    // reader.onload = function() {

    //     console.log(reader.result); 
    //     setImageBlob(reader.result);
    //     setMediaType(type);
    //     console.log(type);

    // };
  
    // reader.onerror = function() {
    //   console.log('error :'+ reader.error);
    // };
}


    const handleUrl = async (e) =>{
    
          const urInput = await e.target.value.trim();
   

       if(urInput.includes('youtube.com/') || urInput.includes('//youtu.be') ){
            const fileUrl = urYt (urInput);  
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);
       }
       else if(urInput.includes('www.instagram.com')){
            const fileUrl = urIg (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);
       }
       else if(urInput.includes('www.tiktok.com')){
            const fileUrl = urTk (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);
       }  
       else if(urInput.includes('vm.tiktok.com') || urInput.includes('vt.tiktok.com') ){ //tiktok errr-----------------
       
            setdiariesData({...diariesData, file: urInput, media: 'url'});
            console.log(diariesData);
       }
       else if(urInput.includes('twitter.com')){

        const fileUrl = urInput.trim()
        setdiariesData({...diariesData, file: fileUrl, media: 'url'});
        console.log(diariesData);
        }
        else if(urInput.includes('soundcloud.com')){

            const fileUrl = urSn (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('pinterest.com')){

            const fileUrl = urPn (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('pin.it')){ //pin err--------------

        
            setdiariesData({...diariesData, file: urInput, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('reddit.com')){

            const fileUrl = urRd (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        //========fill these
        else if(urInput.includes('facebook.com')){

            const fileUrl = urFb (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('drive.google')){

            const fileUrl = urDr (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('twitch.tv')){

            const fileUrl = urTch (urInput);
            console.log (fileUrl);
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('wordpress.com')){

           
            const fileUrl = urInput.trim();
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput.includes('https://')){

           
            const fileUrl = urInput.trim();
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
        else if(urInput === ''){

           
            const fileUrl = urInput.trim();
            setdiariesData({...diariesData, file: fileUrl, media: 'url'});
            console.log(diariesData);

        }
    }

    const getDiaries = async()=>{
        dispatch(getDiariesAction()); 
    }
    const searchName = async()=>{
        setSearchingName(true);
        dispatch(searchMiniProfileAction(searchedName,setSearchingName, setSearchError));  
    }

    const uploadLink = async (url)=>{


       const constructor = async(url) => {

            const diariesDataConstruct = {
                    title: diariesData.title,
                    caption: diariesData.caption,
                    file: url,
                    media: diariesData.media,
                    type:'diary',
                    publicity: diariesData.publicity};

                return diariesDataConstruct;
 
            }

           try{ 
           
                const diariesData = await constructor (url);
                console.log(diariesData);

              dispatch(postDiariesAction (diariesData, setpopPosted, navigate)); 

            }
            catch(err){

                console.log(err)

            }
    }
    const uploadLinkPost = async ()=>{
 
            try{ 
            
                 console.log(diariesData);
 
               dispatch(postDiariesAction (diariesData, setpopPosted, navigate, getDiaries, setSpam)); 
 
             }
             catch(err){
 
                 console.log(err)
 
             }
     }
    
//FIREBASE=====================

    const uploadFile = async (image) =>{
            if (!image) return;
            const uploadDate = Date.now();
            const fileOwner = user.result._id;
            const fileType = diariesData.media;

            const storageRef = ref (storage, `/diaryfiles/${fileType}-${uploadDate}-${fileOwner}`);
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
            setProgress(90);
            uploadLinkPost();
        }
            
    }


   

    return (
        <div className="flex items-center justify-center">
       

                { popPosted == true &&
                        <div className=" bg-gray-700 py-4 rounded-full px-20 flex justify-center fixed z-40 top-40 m-auto text-center font-bold text-white">
                           <p> Post Added! </p>
                        </div>
                }

            { spam == true &&
                        <div className=" bg-gray-700 py-4 rounded-full px-20 flex justify-center fixed z-40 top-40 m-auto text-center font-bold text-white">
                           <p> Todays Posting Limit(10) reached! Try Tomorrow </p>
                        </div>
                 } 
               
                <div className="p-5 space-y-5 w-full xl:w-2/5 bg-gray-100 items-center  z-30  m-4 rounded-xl">
                        
                       
                       
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
                            <img src={user.result.dpUrl} alt="DP" className="rounded-full h-7 w-7"/>
                        
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
                                            <div className= ' items-center border border-gray-400 rounded-full  text-xs py-1 px-2 bg-gray-400 text-white' >
                                             <div className= 'items-center flex'>
                                              <BsLink45Deg size={20}/> 
                                               link Site
                                              </div>
                                            </div>
                                           
                                                <div onClick ={clearUrl} className= ' items-center bg-transparent border border-gray-300 rounded-full text-gray-500 text-xs py-1 px-2 cursor-pointer hover:bg-gray-500 hover:text-white' >
                                                <div className= 'items-center flex'>
                                                    <MdFileUpload size={20}/>
                                                        Upload File Instead
                                                    </div>
                                                </div>
                                        
                                        </>
                                    }

                                    {attachment === 'file' &&
                                        <>
                                            <div onClick ={(e)=> {
                                                setAttachment('link');
                                               clearInput();
                                               
                                              
        
                                        }} className= ' items-center bg-transparent border border-gray-300 rounded-full text-gray-500 text-xs py-1 px-2 cursor-pointer hover:bg-gray-500 hover:text-white' >
                                                <div className= 'items-center flex'>
                                              <BsLink45Deg size={20}/> 
                                               link Site Instead
                                              </div>
                                            </div>

                        
                                            <div className= 'items-center border border-gray-400 rounded-full  text-xs py-1 px-2 bg-gray-400 text-white'>
                                               <div className= 'items-center flex'>
                                                    <MdFileUpload size={20}/>
                                                        Upload File
                                                </div>
                                            </div>
                                       
                                        </>
                                    }

                                </div>
                            </div>


                            
                   



                                {/*-- URL------------ */}
                                    {attachment === 'link' &&
                                    
                                    <div className="flex justify-center">
                                        <div className='m-auto bg-transparent w-full p-3'>
                                        <input id= "url"
                                        //value= {diariesData.file}
                                        //onChange={(e)=> setdiariesData({...diariesData, file: e.target.value})}
                                        {...register('url',{
                                            onChange: (e) => {handleUrl(e)}
                                            })}  
                                        
                            
                                        placeholder="Paste Url Here (Optional)" className="rounded-full text-center w-full text-gray-700 font-light outline-none text-sm px-4 p-1 sm:py-2 border border-gray-300 bg-gray-100"/>
                                         <p className='mx-3 text-xs text-red-700 font-light' >{errors.url?.message}</p>
                                         </div>
                                    </div>
                                      
                                    }
                                 {/*-- FILE------------ */}
                                 {attachment === 'file' && 
                                    <div>
                                    <div className= 'w-full flex justify-center space-x-5'>
                                    

                                       {/* UPLOAD INPUTS */} 
                                        
                                        <input {...register('ImageUpload',{
                                            onChange: (e) => {readFile(e.target.files[0], types.image)}
                                            })}  
                                         className= "hidden" id='ImageUpload' type="file" accept="image/png, image/jpeg, image/jpg"/> 

                                        <input {...register('VideoUpload',{
                                            onChange: (e) => {readFile(e.target.files[0], types.video)}
                                            })}  
                                         className= "hidden" id='VideoUpload' type="file" accept="video/ogg, video/mp4, video/webm"/> 

                                        <input {...register('AudioUpload',{
                                            onChange: (e) => {readFile(e.target.files[0], types.audio)}
                                            })}  
                                         className= "hidden" id='AudioUpload' type="file" accept="audio/mpeg, audio/mp3, audio/wav, audio/ogg"/> 
                                        

                                          {/* LABELSSSS */}

                                        <label htmlFor= 'ImageUpload' className='py-3'>
                                                    <div onClick ={clearInput} className= 'm-auto items-center  hover:bg-gray-500 hover:text-white  rounded-full  text-xs font bg-gray-100 border border-gray-300 text-gray-500 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-xs m-auto bg-transparent p-1'>
                                                            <BsFileEarmarkImageFill size={20}/> 
                                                         Image
                                                        </div>
                                                        
                                                        
                                                    </div>
                                        </label>

                                        <label htmlFor= 'VideoUpload' className='py-3'>
                                        <div onClick ={clearInput} className= 'm-auto items-center  hover:bg-gray-500 hover:text-white  rounded-full  text-xs font  bg-gray-100 border border-gray-300 text-gray-500 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-xs m-auto bg-transparent p-1'>
                                                            <MdVideoLibrary size={20}/> 
                                                         Video
                                                        </div>          
                                                    </div>
                                        </label>
                                      
                                         <label htmlFor= 'AudioUpload' className='py-3'>
                                         <div onClick ={clearInput}className= 'm-auto items-center  hover:bg-gray-500 hover:text-white  rounded-full  text-xs font  bg-gray-100 border border-gray-300 text-gray-500 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-xs m-auto bg-transparent p-1'>
                                                            <MdLibraryMusic size={20}/> 
                                                         Audio
                                                        </div>
                                                    </div>
                                        </label>
                                        </div>  

                                        {diariesData.media ==='image' &&  <p className='mx-3 text-xs text-center text-red-700 font-light' >{errors.ImageUpload?.message}</p>} 
                                        {diariesData.media ==='video' &&  <p className='mx-3 text-xs text-center text-red-700 font-light' >{errors.VideoUpload?.message}</p>}
                                        {diariesData.media ==='audio' && <p className='mx-3 text-xs text-center text-red-700 font-light' >{errors.AudioUpload?.message}</p>}
                                        
                                          {/* <p className='mx-3 text-xs text-center text-red-700 font-light' >{errors.PdfUpload?.message}</p> */}
                                                      


                                       
                                      

                                         {/* <label htmlFor= 'PdfUpload' className='py-3'>
                                         <div onClick ={clearInput} className= 'm-auto items-center  hover:bg-gray-400 hover:text-white  rounded-md  text-xs font bg-gray-100 border border-gray-300 text-gray-400 p-1'>
                                                        <div className= 'flex justify-center items-center font-semibold text-sm m-auto bg-transparent p-1'>
                                                            <MdPictureAsPdf size={20}/> 
                                                         Pdf
                                                        </div>
                                                    </div>
                                        </label> */}
                                       
                                    </div>
                                }

                     
                                {/* Clear Button */}

                                {diariesData.media === "url" && 
                                        <div onClick= {clearUrl_NoSwitch} className= 'flex  w-1/5 justify-center items-center font-semibold text-xs m-auto bg-transparent p-1 text-gray-300 hover:text-red-400 cursor-pointer'>
                                            <BiUnlink size={20}/> 
                                            Clear Url
                                        </div>                              
                                }
                                {diariesData.media.length>1 && diariesData.media !== "url" && 
                                        <div onClick= {clearInput} className= 'flex w-1/5 justify-center items-center font-semibold text-xs m-auto bg-transparent p-1 text-gray-300  hover:text-red-400 cursor-pointer'>
                                            <BsFileEarmarkMinus size={20}/> 
                                           Clear File
                                        </div>                              
                                }


                    {/*========== ========Preview Box ===========*/}

                                        {/* =======MEDIAS ===========*/}
                                     {imageBlob.length && imageBlob.includes('blob') && diariesData.media === 'image'?
                                        <div >
                                          
                                            <div className="relative flex justify-center m-auto w-full p-2 lg:p-0">
                                                <PicForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {imageBlob.length && imageBlob.includes('blob') && diariesData.media === 'pdf' ?
                                        <div >
                                          
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                <PdfForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {imageBlob.length && imageBlob.includes('blob') && diariesData.media === 'audio' ?
                                        <div >
                                          
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                <AudioForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {imageBlob.length && imageBlob.includes('blob') && diariesData.media === 'video' ?
                                        <div >
                                          
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
                                                <VideoForm Url= {imageBlob}/>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                    
                                {/* ======YOUTUBE======== */}
                                  { diariesData.file.length && diariesData.file.includes('youtube.com/')?
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
                                      && !diariesData.file.includes('youtube.com/')
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
                                    <div className="px-3 flex justify-center">
                                        <div className='w-full'>
                                        <input name= "title"
                                        value= {diariesData.title} 

                                        {...register('title',{
                                        onChange: (e) => {setdiariesData({...diariesData, title: e.target.value})}
                                        })}  
                        
                                        placeholder="Enter Title" className="text-gray-700 font-light outline-none my-1 w-full px-4 p-1 sm:py-2 border border-gray-300 rounded-md bg-gray-100"/>
                                        <p className='mx-3 text-xs text-red-700 font-light' >{errors.title?.message}</p>
                                        </div>
                                    </div>
                                {/* ---Content---------------  */}
                                    <div className="px-3 items-center">
                                        <div className='w-full items-center'>

                                                <textarea name= "caption"
                                                value= {diariesData.caption}  

                                                {...register('caption',{
                                                onChange: (e) => {setdiariesData({...diariesData, caption: e.target.value})}
                                                })}   
                                
                                                placeholder="Enter Caption" className="resize-none h-28 sm:h-32 text-gray-700 font-light outline-none  mt-1 w-full  px-4 py-2 border border-gray-300 rounded-md bg-gray-100"/>
                                                <p className='text-xs text-red-700 font-light' >{errors.caption?.message}</p>
                                                <div onClick={()=>setEmojiBox(!emojiBox)} className='w-max mx-auto my-1 text-gray-100 bg-gray-400 hover:bg-gray-500 rounded-full p-1'>
                                                    <BsFillEmojiLaughingFill/>
                                                </div>
                                       
                                        </div>

                                        {emojiBox && 
                                                    <div className='flex justify-center bg-gray-300'>
                                                        <Picker className= 'bg-gray-300' onEmojiClick={onEmojiClick} />
                                                    </div>
                                        }
                                    </div>
                                {/* TAGG------------- */}
                                    <div className="m-auto w-3/4">
                                        <div className='flex bg-transparent h-10'>
                                        <input name= "endorsement" onChange={(e)=>{
                                            setSearchedName(e.target.value.toLocaleLowerCase().replace('@', '').trim());
                                            setSearchError(false);
                                            console.log(diariesData);
                                        }}
                                        placeholder="Mentions(Optional) Enter a Name then Click Search" className="text-gray-700 text-xs font-light outline-none rounded-full w-full px-4 py-1 border border-gray-300 rounded-md bg-gray-100"/>
                                        {/* <p className='mx-3 text-xs text-red-700 font-light' >error</p> */}  
                                            {searchingName===false && searchedName.length>0 &&
                                                <div onClick={searchName} className="flex justify-center items-center p-1 m-1  bg-gray-400 cursor-pointer text-gray-100 rounded-full hover:bg-gray-600 items-center">
                                                    <MdSearch size={24}/>
                                                </div> 
                                            }
                                            {searchingName===true &&
                                                <div className=" flex justify-center w-16 p-1 m-1  bg-gray-400 cursor-pointer text-gray-100 rounded-full hover:bg-gray-600 items-center">
                                                    <BeatLoader size={7} color='white' loading/>
                                                </div> 
                                            }
                                        </div>
                                      {searchedMiniProfile.userName?.length > 0 && searchedName !== user.result.userName && searchedMiniProfile._id !== user.result._id &&
                                        <div className='flex  justify-center text-xs items-center space-x-1 bg-gray-300 rounded-md p-1 m-1'>
                                        <img src={searchedMiniProfile.dpUrl} alt="DP" className="rounded-full h-7 w-7"/>
                                            <p>@{searchedMiniProfile.userName}</p>
                                            <div onClick={()=>{
                                                if(!tagArray.includes(searchedMiniProfile._id) 
                                                && !tagObjArray.includes(searchedMiniProfile) 
                                               
                                                && tagArray.length < 21 
                                                ){

                                                  tagObjArray.push(searchedMiniProfile);
                                                   
                                                  setdiariesData({
                                                    ...diariesData,
                                                     tags:diariesData.tags.concat(searchedMiniProfile._id)
                                                    });
                                                    
                                                }
                                            }} className="p-0.5 bg-gray-400 cursor-pointer text-gray-100 rounded-md hover:bg-gray-400 items-center">
                                                <p>add</p>
                                            </div>
                                        </div>}
                                        {searchError===true && searchedMiniProfile ==="NO_USER" && 
                                        <div className='flex text-xs text-red-600 items-center space-x-1 bg-gray-300 rounded-md p-1 m-1'>
                                            <p>@{searchedName} Not Found. Ensure they exist</p>
                                        </div>}
                                        {searchedName === user.result.userName && 
                                        <div className='flex text-xs text-red-600 items-center space-x-1 bg-gray-300 rounded-md p-1 m-1'>
                                            <p>You cant Endorse yourself!</p>
                                        </div>}
                                    </div>

                                    {diariesData.tags.length>0 && tagObjArray.length>0 &&
                                    <div className="flex p-1 flex-wrap w-full bg-transparent rounded-md text-xs space-x-1 justify-center">
                                            {
                                                tagObjArray.map((tag) =>(
                                                    <div key={tag._id} >
                                                        <PostFormTagSearch diariesData= {diariesData} setdiariesData={setdiariesData} tag={tag} tagArray={tagArray} tagObjArray={tagObjArray} setTagObjArray={setTagObjArray} setTagArray={setTagArray} />
                                                    </div>
                                                )) 
                                            }
                                    </div>}
                                    
                                    
                                {/* Button------------- */}
                                    <button type= {progress > 0 ? 'button' : 'submit'} className="items-center mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-1/3 rounded-md
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold p-1">
                                        {progress === 0 ?<p>Post</p>:
                                      <p>Uploading...</p>}
                                    </button>
                                

                            
                            
                            

                        </div>
                        </form>
        </div>
      
        </div>
    )
}

export default PostForm;