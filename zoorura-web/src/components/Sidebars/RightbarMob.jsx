import RightbarmobRow from './RightbarmobRow.jsx';
import ContactMod from '../Modals/ModalMods/ContactMod.jsx';
import { useState } from 'react';
import {useSelector} from 'react-redux';
//import { UserIcon } from '@heroicons/react/outline';
import {BeatLoader} from "react-spinners";


function RightbarMob({user, setpopContacts}){

    const[popChatBox, setpopChatBox] = useState(false);
    const[guest, setGuest] = useState('');
    const convos = useSelector((state) => state.convosReducer);
   console.log(convos);
    console.log('IDDD:' + user.result._id);

return (
    
    <div className=" p-7 w-full sm:w-1/4 m-x-4 bg-gray-200 z-10 fixed right-0 top-24 sm:top-20 h-screen overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">

        <div className="ml-1 font-bold text-gray-500 p-1">
        Contacts
        </div>
          
            {/* Contacts People */}
            <div className="mb-60">
               {popChatBox && 
               <ContactMod setpopChatBox={setpopChatBox}/>
               }
               {convos.length &&
                <>
                    {
                        convos.map((convo) => {

                            if (convo.host._id == user.result._id){       
                                return (
                                    <RightbarmobRow key={convo._id} setpopChatBox={setpopChatBox} Src = {convo.guest.dpUrl} title ="#111" PersonName= {convo.guest.userName} Points= {convo.tip} />
                                )
                            }
                            if (convo.host._id != user.result._id) {
                                return (
                                    <RightbarmobRow key={convo._id} setpopChatBox={setpopChatBox} Src = {convo.host.dpUrl} title ="#111" PersonName= {convo.host.userName} Points= {convo.tip} />
                                )
                            }
                        }
                        )
                    }
                </> 
                }
                {convos == "NO_CONVO" &&
                <>
                  
                            <RightbarmobRow  setpopChatBox={setpopChatBox} title ="NO CONVOS FOUND"/>
                 
                </> 
                }
                {!convos.length &&
                <>
                  
                            <BeatLoader size={24} color='white' loading/>
                            <RightbarmobRow  setpopChatBox={setpopChatBox}  title ="Fetchincg Convos" />

                </> 
                }

            </div> 
    </div>
</div>
);
}
export default RightbarMob;