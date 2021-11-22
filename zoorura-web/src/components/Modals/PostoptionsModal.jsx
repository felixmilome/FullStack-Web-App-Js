import PostOptionsRow from "./PostOptionsRow.jsx";
import { BookmarkIcon, ExclamationIcon, TagIcon, TrashIcon } from '@heroicons/react/outline';
//import EditDiaryModal from "./EditDiaryModal.jsx"
import {useDispatch} from 'react-redux';
import { deleteDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";
import{AiOutlineEdit} from "react-icons/ai";
import {Link} from 'react-router-dom';
import { useState } from "react";
import PostEdit from "../Body/PostEdit.jsx";

function PostoptionsModal({diary, diaryId, setpopOptions, setDiaryId}) {

  
    const[popEdit, setPopEdit] = useState(false);
    const[postId, setPostId] = useState(false);
   

    const dispatch = useDispatch();

    return (
       <div>
        <div className="absolute z-20 right-4 sm:right-12 top-20 opacity-90 rounded-b-xl bg-gray-100">
            <div>
            <PostOptionsRow Icon = {BookmarkIcon} title ="Save"/>
            </div>
            <div onClick = {()=> {console.log("matumbo")}}>
            <PostOptionsRow Icon = {TagIcon} title ="Tag" />
            </div>

            <div onClick = {()=> dispatch(deleteDiariesAction(diary._id))}>
            <PostOptionsRow Icon = {TrashIcon} title ="Delete"/>
            </div>
            <div>  
            <PostOptionsRow Icon = {ExclamationIcon}  title ="Report"/>
            </div>
            <div onClick = {()=> setPopEdit(true)}>
                <div onClick = {()=> setPostId(diary._id)}>  
                <PostOptionsRow Icon = {AiOutlineEdit} title ="Edit"/>
                </div>
            </div>
           

            {/* </Link> */}
            {/* <EditDiaryModal diary={diary} setDiaryId={setDiaryId}/> */}
        </div>
        <div className="bg-gray-200 absolute top-20 left-0 z-40 w-full">
           {popEdit && <PostEdit diary={diary} postId={postId} setPostId={setPostId} setpopOptions ={setpopOptions}/>}
           </div>
        </div>
        
       
    )
}

export default PostoptionsModal;
