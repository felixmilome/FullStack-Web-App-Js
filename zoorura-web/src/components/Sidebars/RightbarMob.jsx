import RightbarmobRow from './RightbarmobRow.jsx';
import ContactMod from '../Modals/ModalMods/ContactMod.jsx';
import { useState } from 'react';

function RightbarMob(){

    const[popChatBox, setpopChatBox] = useState(false);

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
                <RightbarmobRow  setpopChatBox={setpopChatBox} Src = "./assets/images/jolie.jpeg" title ="#111" PersonName= "@AngelinaJolie:" Points= "3b aps" />
            
            </div>
    </div>
</div>
);
}
export default RightbarMob;