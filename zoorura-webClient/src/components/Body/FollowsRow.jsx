import {HiOutlineChatAlt2} from "react-icons/hi"
import {quickFollowAction} from "../Midwares/rdx/actions/profileAction.js";
import {BeatLoader} from "react-spinners";
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import ConvoForm from './ConvoForm.jsx';
import ContactMod from '../Modals/ContactMod.jsx';

export const FollowsRow = ({miniProfile, setpopContactsFalse}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const[loadingFollow, setLoadingFollow] = useState(false);
    const [contactsIndi, setContactsIndi] = useState(false);
    const [popConvoForm, setpopConvoForm] = useState(false);
    
   
   
    const socket = useSelector((state) => state.socketReducer);
    
    const[online, setOnline] = useState(false);

   
    const[checkData, setCheckData] = useState({checkedId: miniProfile._id, checkerId: user.result._id});

    const convosAll = useSelector((state) => state.convosReducer);
    const convoState = useSelector((state) => state.convoStateReducer); 
    const follows = useSelector((state) => state.followsReducer);
    console.log(follows);
    console.log(miniProfile._id);
    
    

    const dispatch = useDispatch ();

    const  Chat = convosAll.filter( Chat =>

        ( Chat.guest._id == user.result._id &&  Chat.host._id === miniProfile._id)
        ||( Chat.host._id == user.result._id &&  Chat.guest._id === miniProfile._id)

    );

    const followHandler= (userId) => {
        const followDataObj = {follower:'', followed:userId}; 
        setLoadingFollow(true);
        dispatch (quickFollowAction(followDataObj, setLoadingFollow));  
    }

    //SetOnlineChecker for each Box. Then a shuffle button.


    const convoHandler = async() =>{ 

        if( Chat.length < 1 && convoState !== 'SearchingConvo'){

            setpopConvoForm(true);

        }
        else if ( Chat.length > 0 && convoState === 'YesConvo'){
            //setpopConvoForm(true);
           setpopContactsFalse();
            setContactsIndi(true);

        }
    }

    useEffect(() => {
        socket.current.emit("checkUserOnline", {
         checkData
      });
    }, []);

    // useEffect(() => {
    //     socket.current.on("checkedUserOffline", checkDataResponse =>{
    //         console.log(checkDataResponse);
    //         console.log("User Offline");

            

    //         if (checkDataResponse.checkedId === miniProfile._id){
    //           setOnline(false);
    //         }

    //     })
    // }, []);

    useEffect(() => {
        socket.current.on("checkedUserOnline", checkDataResponse =>{
            console.log(checkDataResponse);
            console.log("User Online");

            if (checkDataResponse.checkedId === miniProfile._id){
              setOnline(true);
            }

        })
    }, []);

  return (
        <> 
          
            <div className= 'border dark:border-gray-700 z-30 m-auto my-2 flex justify-center items-center rounded-xl sm:h-80 h-64 p-2  text-xs w-5/6 p-1 bg-gray-100 dark:bg-gray-900 shadow-xl'>
                <div className='m-auto'>

                    <img src={miniProfile.dpUrl} alt="DP" className="m-auto p-0.5 rounded-full h-32 w-32 sm:h-40 sm:w-40"/>
                    
                    <div className='m-auto w-32 break-words my-1 text-center  font-bold'>
                        <p>@{miniProfile.userName}</p>
                    </div>
                   

                    <div className='space-y-2 my-2'>
                        {loadingFollow ===false &&  !follows.includes(miniProfile._id) &&  miniProfile._id !== user.result._id &&
                        <div onClick={()=>followHandler(miniProfile._id)} className='flex justify-center mx-auto text-center font-normal bg-gray-200 hover:bg-cyan-300 dark:hover:bg-gray-700 dark:bg-gray-800 rounded-full w-32 p-1 cursor-pointer'>
                            <p>Subscribe</p>
                        </div>}
                        {loadingFollow ===false &&  follows.includes(miniProfile._id) &&  miniProfile._id !== user.result._id &&
                        <div onClick={()=>followHandler(miniProfile._id)} className='flex text-gray-100 dark:text-gray-900 justify-center mx-auto text-center font-normal bg-cyan-500 hover:bg-cyan-400 rounded-full w-32 p-1 cursor-pointer'>
                            <p>unsubscribe</p>
                        </div>}
                        {loadingFollow === true &&
                        <div className='flex justify-center mx-auto text-center font-bold bg-gray-200 hover:bg-cyan-400 rounded-full w-32 p-1'>
                           <BeatLoader size={5} color ='cyan'/>
                        </div>}
                        {miniProfile._id !== user.result._id && <div onClick={convoHandler}  className={`flex justify-center mx-auto flex items-center text-center ${online ===true && `border border-gray-300` }  border border-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-full py-1 px-2 w-32 cursor-pointer`}>
                            <HiOutlineChatAlt2 className=" h-4 w-4 text-gray-700 dark:text-gray-300"/> 
                            <p>Chat</p>
                            {online ===true && <p className='text-cyan-500 '>: online</p>}
                            {online ===false && <p className='text-gray-400 '>: offline</p>}
                        </div>}

            
                    </div>
 
                    

                </div>
            </div> 

                    
          
                {popConvoForm &&
                <div className="w-full h-screen fixed  top-36 left-0 z-50  flex w-full  justify-center">

                    <OutsideClickHandler     
                    onOutsideClick={() => {
                        setpopConvoForm(false);
                    }}>
                        <div className="m-auto">
                        <ConvoForm miniProfile={miniProfile} user={user} setpopConvoForm={setpopConvoForm}/>
                        </div>
                    </OutsideClickHandler>
                    </div>
                } 
             <div className='absolute top-0 left-0 w-screen h-screen '> 
             <OutsideClickHandler     
                    onOutsideClick={() => {
                        setContactsIndi(false); //Outside Click Specifically for ChatHunt. The absolutes in the div removes outside click handlers padding
                    }}>

            {contactsIndi && Chat[0]?._id && <ContactMod convoId={ Chat[0]?._id} setpopChatBox={setContactsIndi} displayed= {miniProfile} viewer = {user.result}/>}
            </OutsideClickHandler>
            </div>
        </>
  )
}

