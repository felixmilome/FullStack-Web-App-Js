import { PhoneIcon, VideoCameraIcon, XCircleIcon } from "@heroicons/react/outline"
import ReceivedBubble from "./ReceivedBubble.jsx"
import SentBubble from "./SentBubble.jsx";
import {BeatLoader} from "react-spinners";
import{BsFileEarmarkImageFill} from 'react-icons/bs';
import{MdLibraryMusic, MdVideoLibrary} from 'react-icons/md';
import {useSelector, useDispatch} from 'react-redux';
import { MdSend} from "react-icons/md";
import {useState, useRef, useEffect} from 'react';
import {postMessagesAction, getMessagesAction} from '../Midwares/rdx/actions/messagesAction.js';
import {postNotificationsAction} from '../Midwares/rdx/actions/notificationsAction.js';

import {PicForm, AudioForm, VideoForm} from "../Body/PostForms/Previews.jsx";

import {storage} from "../Midwares/firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { SurePop } from "../Body/SurePop.jsx";
import{readConvoNotificationsAction} from "../Midwares/rdx/actions/notificationsAction.js" 

//Search Area: textarea

function ContactMod({setpopChatBox, convoId, displayed, viewer}) {

    const[messageData, setmessageData] = useState({convoId:convoId, senderId:viewer._id, receiverId:displayed._id, body:'', file:'', type:''});
    const[online, setOnline] = useState(false);
   
    const[loading, setLoading] = useState(false);
    const[progress,setProgress]= useState(0);
    const[checkData, setCheckData] = useState({checkedId: displayed._id, checkerId: viewer._id});
     const[typingMessageData, setTypingMessageData] = useState({convoId:convoId, senderId:viewer._id, receiverId:displayed._id});
    const[notificationData, setnotificationData] = useState({sender:viewer._id, receiver:displayed._id, body:'', postId:convoId, type: ''});
    const[socketNotificationData, setsocketNotificationData] = useState({sender:{_id:viewer._id, dpUrl:viewer.dpUrl, userName:viewer.userName}, receiver:displayed._id, body:'',postId:convoId, type: ''});
     const[typingNotifier, setTypingNotifier] = useState(false);
     const[fileData, setFileData] = useState('');
     const[imageBlob, setImageBlob] = useState('');
     const[contactViewed, setContactViewed] = useState(false);
     


    const dispatch = useDispatch(); 

   

    const socket = useSelector((state) => state.socketReducer);

    const messagesAll = useSelector((state) => state.messagesReducer);

    const openedChats =  useSelector((state) => state.messagesOpenedReducer);

    const thisOpenedChat = openedChats.filter(openedChat => openedChat?.id === convoId && openedChat.opened===true);
    
    console.log(openedChats);

    const allNotifications = useSelector((state) => state.notificationsReducer);
    
    const unreadConvoNotifications = allNotifications.filter(notification => notification.postId === convoId );
    console.log(unreadConvoNotifications);
   
    useEffect(() => { 

        if(!thisOpenedChat.length){

            dispatch(getMessagesAction(convoId));
            const thisOpenedObj = {id:convoId, opened: true}
            dispatch ({type: 'MESSAGES_OPENED', payload: thisOpenedObj});  // for getting messages  
             
        }

    }, []);

    useEffect(() => { 

        if(unreadConvoNotifications.length > 0){ 
            dispatch(readConvoNotificationsAction(convoId));
        }
     
    }, [unreadConvoNotifications]);
    

   

    //const messages = useSelector((state) => state.messagesReducer);

     const messages = messagesAll.filter(message => message.convoId === convoId);
     

    


    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scrollToBottom() 
    }, [messages]);

    // useEffect(() => {
    //     socket.current.on("getMessage", messageData =>{
    //         console.log(messageData);
    //         console.log("Message Gotten");
    //         dispatch ({type: 'SOCKET_GOT_MESSAGE', payload: messageData});
    //         console.log(messages);

    //     })
    // }, []);

     useEffect(() => {
          socket.current.emit("checkUserOnline", {
           checkData
        });
      }, []);

    //   var intervalId = 
      setInterval(function(){

           socket.current.emit("checkUserOnline", {
           checkData
        });
        
      }, 120000);

      useEffect(() => {
        socket.current.on("checkedUserOnline", checkDataResponse =>{
            console.log(checkDataResponse);
            console.log("User Online");

            if (checkDataResponse.checkedId === displayed._id){
              setOnline(true);
            }

        })
    }, []);

     useEffect(() => {
        socket.current.on("checkedUserOffline", checkDataResponse =>{
            console.log(checkDataResponse);
            console.log("User Offline");

            if (checkDataResponse.checkedId === displayed._id){
              setOnline(false);
            }

        })
    }, []);

   
    
     useEffect(() => {
        socket.current.on("getTypingMessage", typingMessageData =>{
            console.log(typingMessageData);
            console.log("Typing Message Gotten");

            if(typingMessageData.convoId === convoId && typingNotifier== false ){
                
                setTypingNotifier(true);
                setTimeout( function() {setTypingNotifier(false)}, 5000);
                
            }
            
            
        }) 
    }, []);

   

    function readFile(file, type) {


        // //BLOB------

            setFileData(file);
            setmessageData({...messageData, type:type});
        
            if(file){

                setImageBlob(URL.createObjectURL(file));

            }
            console.log(imageBlob);
          

    }

    function getCodec() {
        // return Math.floor(Math.random() * 969696);
         return Math.floor(Math.random()*1e9).toString(32);
        };
     

    const uploadFile = async (image) =>{
        
        setLoading(true);
        if (!image) return;
        const uploadDate = Date.now(); 
        const fileOwner = viewer._id;
        const fileType = messageData.type;
        const codec = getCodec();

        const storageRef = ref (storage, `/chatFiles/${fileType}-${uploadDate}-${fileOwner}`);
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
        
            //setmessageData({...messageData, file: url});
            sendFile(url);
            console.log(url);
          
            
            })
        }

    );
   
    };

    
  
    const sendMessage = () => { 

        
        console.log(messageData); 
        setLoading(true);
        setProgress(90)
        dispatch(postMessagesAction(messageData, socket, setLoading, setProgress, setmessageData));
       setContactViewed(true);
           
       // setmessageData({...messageData, body: '', type:''});
        
       
    }

    const sendFile =(url) => {

        setLoading(true);

        const messageDataObj = {
                convoId: messageData.convoId,
                senderId: messageData.senderId,
                receiverId: messageData.receiverId,
                body:'',
                file: url,
                type:messageData.type,
                };



        dispatch(postMessagesAction(messageDataObj, socket, setLoading, setProgress, setmessageData));
        console.log(messageDataObj);
        setContactViewed(true);
        
        


    }

    return (
        <div  className="z-20 border-gray-300 fixed z-50 top-0 xl:top-20 xl:bottom-0 right-0 xl:right-2 m-auto w-full xl:w-1/4  bg-gray-200">
            {/* Top Part */}
            <div className="fixed z-20 
            border-b-2 border-gray-200
             bg-gray-100 p-1
             w-full xl:w-1/4  flex  
             justify-between items-center">
                 
                 

                <div style={{wordBreak: 'break-word'}} className="flex items-center space-x-2
                 bg-transparent justify-around 
                 p-0.5 px-2 rounded-full 
                 text-xs
                  font-bold 
                   text-gray-500">
                    <div className='relative'>
                        <img src={displayed.dpUrl} alt="DP" className="rounded-full object-cover h-8 w-8 m-0.5"/>    
                         {online ===true && <div className= 'absolute top-0 right-0 w-3 h-3 justify-center text-white items-center p-1 rounded-full border-2 border-white bg-cyan-400'>
                        {/* dot */}
                        </div>}
                         {online ===false && <div className= 'absolute top-0 right-0 w-3 h-3 justify-center text-white items-center p-1 rounded-full border-2 border-white bg-gray-400'>
                        {/* dot */}
                        </div>}
                    </div>
                    <div className='items-center '>
                    <p>@{displayed.userName}</p>
                    {typingNotifier && <p className='text-cyan-500' >Typing...</p>}
                    </div>
                    
                </div>
                <div className="mx-1 space-x-2 sm:space-x-2 bg-transparent flex items-center justify-around">
                    <div className="hover:bg-cyan-400
                     p-1 rounded-full cursor-pointer group">
                        <VideoCameraIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                    <div className="hover:bg-cyan-400
                     p-1 rounded-full cursor-pointer group">
                        <PhoneIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                    <div onClick ={(e)=> setpopChatBox(false)} className="hover:bg-gray-300
                     p-1 rounded-full cursor-pointer group">
                        <XCircleIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                </div>

            </div>
            
            {/* ALL MESSAGE CHATs CONTAINER */}
            <div className= "pb-64 lg:pb-80 mt-12 max-h-screen min-h-screen w-full overflow-y-scroll">
                {/* <ReceivedBubble ReceivedMessage="Hello Sir Milome"/>
                <SentBubble SentMessage="I am Fine"/>
                */}
                {messages.length ?

                    <> 
                        {
                            messages.map((message) =>{
                                
    
                                if (viewer._id === message.senderId){ //BELONGS TO ME(VIEWER)
                                
                                    return(
                                        <SentBubble key={message._id} message={message} SentMessage={message.body} File={message.file} Type={message.type}/>
                                    )
                                }
                                if (displayed._id === message.senderId){//BELONGS TO THEM(DISPLAYED) 
                                
                                    return(
                                        <ReceivedBubble key={message._id} contactViewed = {contactViewed} setContactViewed= {setContactViewed} message={message} ReceivedMessage={message.body} File={message.file} displayed={displayed} Type={message.type}/>
                                    )
                                }
                                
                             
                            }
                        )}  
                            <div className= 'w-full  bg-transparent text-xs font-light text-gray-400 flex justify-center' ref={messagesEndRef}>
                                {/* <div className= 'p-3 border-t border-gray-300 m-3'>
                                    <p>messages end</p>
                                </div> */}
                            </div>
                         {/* {
                            messages.map((message) =>{
                                
                                if (displayed._id === message.senderId && message.read === false ){//BELONGS TO THEM(DISPLAYED) 
                                
                                    return(
                                        <ReceivedBubble key={message._id} message={message} ReceivedMessage={message.body} File={message.file} displayed={displayed} Type={message.type}/>
                                    )
                                }
                            }
                        )}      */}
                    </> :

                        <div className='flex justify-start p-5'>
                            <div className=''>
                                <BeatLoader size={15} color='white' loading/>
                                <p className= 'text-sm text-gray-400'>fetching messages..</p>
                            </div>
                        </div>
                }

                    <div className="w-full items-center">
                                  {/* <div className='w-full h-8 flex justify-center'>
                                     {typingNotifier && <div className='flex font-semibold text-gray-500 items-center space-x-1 py-1 px-3  bg-gray-300 rounded-full'>
                                        <p>{displayed.userName} is Typing</p>
                                       <BeatLoader size={10} color='white' loading/>
                                        
                                    </div>}
                                  </div> */}

                                 <div className='w-full mb-40 sm:mb-32'>
                                        {imageBlob.length>0 && messageData.type === 'image' &&
                                        <div className='pt-3 w-full h-full h-8 flex justify-center'>
                                            <div className='font-semibold text-gray-500 items-center bg-gray-300 space-x-1 py-1 px-3 '>
                                            
                                                <PicForm Url={imageBlob}/>
                                                        <div className='flex justify-around'>

                                                            {loading===false &&
                                                                <>
                                                                <div onClick={()=>uploadFile(fileData)}  className='bg-cyan-400 my-7 hover:bg-cyan-500 rounded-full p-2'>
                                                                    <MdSend className='text-gray-100 text-white h-5 w-5 '/>
                                                                </div>
                                                            
                                                                <div onClick={()=>{
                                                                    // setImageBlob('');
                                                                    // setFileData('');
                                                                    setmessageData({...messageData, type:''});
                                                                    }}   className='bg-gray-100 my-7 hover:bg-red-400 rounded-full p-2 group'>
                                                                    <XCircleIcon  className='text-gray-300 group-hover:text-white h-5 w-5 '/>
                                                                </div>
                                                                </>
                                                            }

                                                            {loading === true &&
                                                            <div className='flex justify-center text-xs font-bold text-gray-400 '>
                                                    
                                                                <div className='flex rounded-full items-center justify-center space-x-1 '>
                                                                
                                                                <div className='bg-cyan-400 rounded-full '>
                                                                <BeatLoader size={6} color='white' loading/>
                                                                    </div>
                                                                
                                                                </div>
                                                            </div>
                                                            }
                                                        </div>
                                            {/* <BeatLoader size={10} color='white' loading/> */}   
                                            </div>
                                        </div> }
                                        {imageBlob.length>0 && messageData.type === 'audio' &&
                                        <div className='pt-3 w-full h-full h-8 flex justify-center'>
                                            <div className=' font-semibold text-gray-500 items-center bg-gray-300 space-x-1 py-1 px-3 '>
                                            
                                                <AudioForm Url={imageBlob} DP={viewer.dpUrl}/>
                                                        
                                                        <div className='flex justify-around'>
                                                        {loading ===false && <div onClick={()=>uploadFile(fileData)} className='bg-cyan-400 my-7 hover:bg-cyan-500 rounded-full p-2'>
                                                                <MdSend className='text-gray-100 text-white h-5 w-5 '/>
                                                            </div>}

                                                            {loading ===true &&
                                                            <div className='flex justify-center text-xs font-bold text-gray-400 '>
                                                    
                                                                <div className='flex rounded-full items-center justify-center space-x-1 '>
                                                                
                                                                <div className='bg-cyan-400 rounded-full '>
                                                                <BeatLoader size={6} color='white' loading/>
                                                                    </div>
                                                                
                                                                </div>
                                                            </div>
                                                            }
                                                        
                                                                
                                                            <div onClick={()=>{
                                                                // setImageBlob('');
                                                                // setFileData('');
                                                                setmessageData({...messageData, type:''});
                                                                }}  className='bg-gray-100 my-7 hover:bg-red-400 rounded-full p-2 group'>
                                                                <XCircleIcon  className='text-gray-300 group-hover:text-white h-5 w-5 '/>
                                                            </div>
                                                            
                                                        </div>
                                            {/* <BeatLoader size={10} color='white' loading/> */}   
                                            </div>
                                        </div> }
                                        {imageBlob.length>0 && messageData.type === 'video' &&
                                        <div className='pt-3 w-full h-full h-8 flex justify-center'>
                                            <div className='font-semibold text-gray-500 items-center bg-gray-300 space-x-1 py-1 px-3 '>
                                            
                                                <VideoForm Url={imageBlob}/>
                                                        <div className='flex justify-around'>
                                                        {loading===false &&
                                                                <>
                                                                    <div onClick={()=>uploadFile(fileData)}  className='bg-cyan-400 my-7 hover:bg-cyan-500 rounded-full p-2'>
                                                                        <MdSend className='text-gray-100 text-white h-5 w-5 '/>
                                                                    </div>
                                                                
                                                                    <div onClick={()=>{
                                                                        // setImageBlob('');
                                                                        // setFileData('');
                                                                        setmessageData({...messageData, type:''});
                                                                        }}   className='bg-gray-100 my-7 hover:bg-red-400 rounded-full p-2 group'>
                                                                        <XCircleIcon  className='text-gray-300 group-hover:text-white h-5 w-5 '/>
                                                                    </div>
                                                                </>
                                                            }

                                                            {loading === true &&
                                                            <div className='flex justify-center text-xs font-bold text-gray-400 '>
                                                    
                                                                <div className='flex rounded-full items-center justify-center space-x-1 '>
                                                                
                                                                <div className='bg-cyan-400 rounded-full '>
                                                                <BeatLoader size={6} color='white' loading/>
                                                                    </div>
                                                                
                                                                </div>
                                                            </div>
                                                            }
                                                        </div>
                                            {/* <BeatLoader size={10} color='white' loading/> */}   
                                            </div>
                                        </div> }
                                  </div>
                                

                                {loading===true  && 
                                
                                <div className='w-full text-gray-400 text-sm space-x-2 flex justify-center'>
                                  
                                    <BeatLoader size={6} color='gray' loading/>
                                    <p>{progress}%</p>

                                  </div>}
                                        

                                <div  className=' w-full p-2 sm:w-1/2 lg:w-1/4 fixed bottom-8 right-0'>

                                       
                                    {messageData.type !== 'image' &&messageData.type !== 'video' && messageData.type !== 'audio' &&
                                        <div className ='flex justify-center  w-full'>

                                            <div className={`${messageData.body.length < 25 && `h-12`}
                                                            ${messageData.body.length > 25 && messageData.body.length < 80 && `h-20`}
                                                            ${messageData.body.length > 80 && `h-32`}
                                                            m-1 p-1 rounded-full items-center flex bg-cyan-200 w-full`}>
                                                
                                                <div className={`${messageData.body.length < 25 && `h-12`}
                                                            ${messageData.body.length > 25 && messageData.body.length < 80 && `h-20`}
                                                            ${messageData.body.length > 80 && `h-32`}
                                                            p-2 bg-gray-100 rounded-xl w-full`}>
                                            
                                                <textarea 
                                                value={messageData.body}
                                                onChange={(e)=>{
                                                    socket.current.emit("sendTypingMessage", {
                                                            typingMessageData
                                                        });
                                                    
                                                    setmessageData({...messageData, body: e.target.value, type:'text'});
                                                
                                                    }
                                                    }
                                                type="text" placeholder="Type Message Here..." 
                                                className={`${messageData.body.length < 25 && `h-12`}
                                                            ${messageData.body.length > 25 && messageData.body.length < 80 && `h-20`}
                                                            ${messageData.body.length > 80 && `h-32`}
                                                            resize-none h-full w-full m-auto text-gray-700 font-medium outline-none bg-gray-100 text-sm rounded`}/>
                                            
                                                </div> 

                                            </div>


                                            
                                            { messageData.body.length > 0 && loading === false && messageData.type === 'text' &&
                                                <div className='flex justify-center p-3 text-xs font-bold text-gray-400 '>
                                                    
                                                    <div className='flex rounded-full items-center justify-center space-x-1 '>
                                                    
                                                    <div onClick= {sendMessage} className='bg-cyan-400 rounded-full p-2'>
                                                            <MdSend className='text-gray-100 text-white h-6 w-6 '/>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                }
                                                
                                            {loading ===true && <div className='flex justify-center text-xs font-bold text-gray-400 '>
                                                    
                                                    <div className='flex rounded-full items-center justify-center space-x-1 '>
                                                    
                                                    <div className='bg-cyan-400 rounded-full '>
                                                    <BeatLoader size={6} color='white' loading/>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                }
                                        </div>
                                        }



                                        <div className='flex justify-around pb-5 pt-2  text-gray-400 m-auto  items-center'>
                                             {/* UPLOAD INPUTS */}
                                        
                                        <input  onChange = {(e)=>readFile(e.target.files[0], 'image')} 
                                         className= "hidden" id='ImageUpload' type="file" accept="image/png, image/jpeg, image/jpg"/> 

                                        <input  onChange = {(e)=>readFile(e.target.files[0], 'audio')}
                                         className= "hidden" id='AudioUpload' type="file" accept="audio/mpeg, audio/mp3, audio/wav, audio/ogg"/> 

                                        <input  onChange = {(e)=>readFile(e.target.files[0], 'video')}
                                         className= "hidden" id='VideoUpload' type="file" accept="video/ogg, video/mp4, video/webm"/>   
                                             {messageData.body.length<1 &&
                                                <>
                                            <label htmlFor= 'ImageUpload'>
                                                <div className={`flex hover:text-cyan-500 cursor-pointer justify-center items-center  items-center`}>
                                                    <BsFileEarmarkImageFill size={20}/> 
                                                </div>
                                            </label>

                                            <label htmlFor= 'AudioUpload'>
                                                <div className={`flex  ${messageData.type === 'audio' && `text-cyan-400`} hover:text-cyan-500 cursor-pointer justify-center items-center items-center`}>
                                                    <MdLibraryMusic size={20}/> 
                                                </div>
                                            </label>

                                            <label htmlFor= 'VideoUpload'>
                                                <div className={`flex  ${messageData.type === 'video' && `text-cyan-400`} hover:text-cyan-500 cursor-pointer justify-center items-center  items-center`}>
                                                    <MdVideoLibrary size={20}/> 
                                                </div>
                                            </label>
                                            </>
                                            }
                                               
                                        </div>
                                        
                                  
                                      
                                      
                                </div>
                                  
                                
                    </div>

            </div>
        </div>
    )
}

export default ContactMod;
