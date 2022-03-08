import PostOptionsRow from "./PostOptionsRow.jsx";
import { BookmarkIcon, ExclamationIcon, TagIcon, TrashIcon } from '@heroicons/react/outline';
//import EditDiaryModal from "./EditDiaryModal.jsx"
import {useDispatch} from 'react-redux';
import { deleteDiariesAction} from "../Midwares/rdx/actions/diariesAction.js";
import{ saveDiariesAction } from "../Midwares/rdx/actions/savedDiariesAction.js";
import{AiOutlineEdit} from "react-icons/ai";
import {Link} from 'react-router-dom';
import { useState } from "react";
import PostEdit from "../Body/PostEdit.jsx";
import { DeliveryPop } from "./DeliveryPop.jsx";

function PostoptionsModal({diary, userId, diaryId, setpopOptions, setDiaryId}) {

    const[popDeleted, setPopDeleted] = useState(false);
     const[popSaved, setPopSaved] = useState(false);
    const[popEdit, setPopEdit] = useState(false);
    const[popDelete, setPopDelete] = useState(false);
    const[postId, setPostId] = useState(false);
      const[savedDiaryData, setSavedDiaryData] = useState({diaryId:diary._id});
   

    const dispatch = useDispatch();
    function deleter(){
        
        try{

            dispatch(deleteDiariesAction(diary._id));
            
            setPopDeleted(true);
            setTimeout( function() {setpopOptions(false)}, 2000);

        }
        catch(err){
            console.log(err);
        }
    }
     function saveDiary(){
        
        try{

            dispatch(saveDiariesAction(savedDiaryData, setPopSaved));

        }
        catch(err){
            console.log(err);
        }
    }

    return (
       <div>
               { popDeleted &&
               <DeliveryPop message='Post Deleted'/>
             } 
             { popSaved &&
               <DeliveryPop message='Post Saved'/>
             } 
        <div className="absolute z-40 right-4 sm:right-12 top-20 opacity-90 rounded-b-xl bg-gray-100">

          
            <div onClick= {saveDiary}>
            <PostOptionsRow Icon = {BookmarkIcon} title ="Save"/>
            </div>
            <div onClick = {()=> {console.log("matumbo")}}>
            <PostOptionsRow Icon = {TagIcon} title ="Tag" />
            </div>

            <div onClick = {()=> setPopDelete(true)} >
            <PostOptionsRow 
             Icon = {TrashIcon} title ="Delete"/>
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

        {/* ====ARE YOU SURE ========*/}

        { popDelete &&  <div className="flex justify-center  fixed left-0 z-40 flex w-full  bg-transparent text-base font-light text-gray-700">
               <div className= "fixed z-40 top-80 bg-gray-100 rounded-xl p-8 text-center">
              
                    <p> Are you sure you want to <span className="font-bold">delete</span> this post?</p>
                    <div className="flex justify-around items-center pt-4 m-auto">
                        
                        <div onClick = {deleter} className= "bg-red-400 text-white p-2 rounded-md cursor-pointer hover:bg-red-500">
                            Delete
                        </div>
                       
                        <div onClick = {()=> setpopOptions(false)} className= "bg-gray-400 text-white p-2 rounded-md cursor-pointer hover:bg-gray-500">
                            Cancel
                        </div>
                    </div>
                             
                    
                </div>
                <div className="fixed opacity-70 top-10 z-10 left-0 w-full h-full bg-gray-800"></div>
        </div> }
        
        <div className="bg-gray-200 absolute top-20 left-0 z-40 w-full">
           {popEdit && <PostEdit diary={diary} postId={postId} setPostId={setPostId} setpopOptions ={setpopOptions}/>}
           </div>
        </div>
        
       
    )
}

export default PostoptionsModal;
