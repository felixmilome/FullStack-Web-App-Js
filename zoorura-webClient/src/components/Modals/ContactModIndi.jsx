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
import ContactMod from "./ContactMod.jsx";

 
function ContactModIndi({setpopChatBox, convoId, displayed, viewer}) {

    return (
        <>
         <ContactMod setpopChatBox={setpopChatBox} convoId={convoId} displayed={displayed} viewer={viewer}/>
        </>
    )
   
}

export default ContactModIndi;
