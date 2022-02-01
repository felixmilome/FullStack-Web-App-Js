import RightbarmobRow from './RightbarmobRow.jsx';
import ContactMod from '../Modals/ContactMod.jsx';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
//import { UserIcon } from '@heroicons/react/outline';
import {BeatLoader} from "react-spinners";
import{getMessagesAction} from "../Midwares/rdx/actions/messagesAction.js"


function RightbarMob({user, setpopContacts, unreadMessages}){

    const[popChatBox, setpopChatBox] = useState(false);
    const[displayed, setDisplayed] = useState(null);
    const[viewer, setViewer] = useState(null);
    const[convoId, setConvoId] = useState(null);
    const convos = useSelector((state) => state.convosReducer);


const chatSetterDirect = (guestData, hostData, idConvo) =>{
    setDisplayed(guestData);
    setViewer(hostData);
    setConvoId(idConvo);
    getMessagesAction(idConvo);
  
}
const chatSetterInverse = (guestData, hostData, idConvo) =>{
    setDisplayed(hostData);
    setViewer(guestData);
    setConvoId(idConvo);
    getMessagesAction(idConvo);
  
}



return (
    
    <div className=" p-7 w-full sm:w-1/4 m-x-4 bg-gray-200 z-10 fixed right-0 sm:right-1.5 top-24 sm:top-20 rounded-md h-screen overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">

        <div className="ml-1 font-bold text-gray-500 p-1">
        Contacts
        </div>
          
            {/* Contacts People */}
            <div className="mb-60">

            {popChatBox && 
                <ContactMod setpopChatBox={setpopChatBox} convoId={convoId} displayed={displayed} viewer={viewer}/>
            }  
              
               {convos.length &&
                <>
                    {
                        convos.map((convo) => {

                           // const unreadConvoMessage = unreadMessages.filter(unreadMessage => unreadMessage.read === false && (unreadMessage.receiver._id === user.result._id || unreadMessage.receiver === user.result._id ));
                           // console.log(unreadConvoMessage);
                            if (convo.host._id === user.result._id){

                                const unreadConvoMessage = unreadMessages.filter(unreadMessage =>
                                     (unreadMessage.read === false)
                                      && (unreadMessage.sender._id === convo.guest._id)
                                       && (unreadMessage.receiver._id === user.result._id
                                         || unreadMessage.receiver === user.result._id ));
                              
                                    return (    //X--DISPLAY (THEM)GUEST: THEY ARE GUEST 
                                        <div key={convo._id}

                                            onClick ={()=>{
                                            chatSetterDirect(convo.guest, convo.host, convo._id)
                                            }} >

                                            <RightbarmobRow popChatBox={popChatBox}  setpopChatBox={setpopChatBox} 
                                            Src = {convo.guest.dpUrl} title ={unreadConvoMessage.length} GuestName= {convo.guest.userName} Points= {convo.tip} /> 
                                           
                                            {/* {popChatBox && 
                                                <ContactMod setpopChatBox={setpopChatBox} convoId={convo._id} guest={JSON.parse(guest)} host={JSON.parse(host)}/>
                                            }   */}
                                        </div> 
                                    )
                                }
                                
                                
                            if (convo.host._id !== user.result._id) {

                                const unreadConvoMessage = unreadMessages.filter(unreadMessage => 
                                    (unreadMessage.read === false)
                                     && (unreadMessage.sender._id === convo.host._id)
                                      && (unreadMessage.receiver._id === convo.guest._id
                                         || unreadMessage.receiver === convo.guest._id ));
                                
                                // const guest = JSON.stringify(convo.host);
                                // const host = JSON.stringify(convo.guest);
                                // const guest = convo.guest;

                                    return ( //Y--DISPLAY (THEM)HOST: THEY ARE HOST 
                                        <div key={convo._id} 
                                        
                                            onClick ={()=>{
                                                chatSetterInverse(convo.guest, convo.host, convo._id)
                                            }
                                            }>
                                                {unreadConvoMessage.length &&
                                                        <RightbarmobRow key={convo._id} popChatBox={popChatBox} setpopChatBox={setpopChatBox} 
                                                         Src = {convo.host.dpUrl} title ={unreadConvoMessage.length} GuestName= {convo.host.userName} Points= {convo.tip} />
                                                }
                                                {unreadConvoMessage.length === 0 &&
                                                        <RightbarmobRow key={convo._id} popChatBox={popChatBox} setpopChatBox={setpopChatBox} 
                                                        Src = {convo.host.dpUrl} title ={unreadConvoMessage.length} GuestName= {convo.host.userName} Points= {convo.tip} />
                                                }
                                            {/* {popChatBox && 
                                                <ContactMod setpopChatBox={setpopChatBox} convoId={convo._id} guest={host} host={guest}/>
                                            }   */}
                                        </div> 
                                    )
                                
                            }
                        }
                    )
                    }
                    </> 
                }
                {convos == "NO_CONVO" &&
                <>
                  
                            <RightbarmobRow popChatBox={popChatBox}   setpopChatBox={setpopChatBox} title ="NO CONVOS FOUND"/>
                 
                </> 
                }
                {!convos.length &&
                <>
                  
                            <BeatLoader size={24} color='white' loading/>
                            <RightbarmobRow  popChatBox={popChatBox}  setpopChatBox={setpopChatBox}  title ="Fetchincg Convos" />

                </> 
                }

            </div> 
    </div>
</div>
);
}
export default RightbarMob;