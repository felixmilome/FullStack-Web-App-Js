import PostOptionsRow from "./PostOptionsRow.jsx";
import { BookmarkIcon, ExclamationIcon, TagIcon, TrashIcon } from '@heroicons/react/outline';
//import EditDiaryModal from "./EditDiaryModal.jsx"
import {useDispatch, useSelector} from 'react-redux';
import { deleteDiariesAction} from "../Midwares/rdx/actions/diariesAction.js";
import{ saveDiariesAction } from "../Midwares/rdx/actions/savedDiariesAction.js";
import{ getTagsAction } from "../Midwares/rdx/actions/tagsAction.js";
import{AiOutlineEdit} from "react-icons/ai";
import {Link} from 'react-router-dom';
import { useState, useEffect} from "react";  
import PostEdit from "../Body/PostEdit.jsx";
import { DeliveryPop } from "./DeliveryPop.jsx";
import { PostTagRow } from "./PostTagRow.jsx";
import * as axs from '../Midwares/rdx/actions/axs';
import { Spring, animated } from 'react-spring';
import {BeatLoader} from "react-spinners";

//search area: tags Delete

function PostoptionsModal({diary, userId, diaryId, setpopOptions, setDiaryId}) {

    const[popDeleted, setPopDeleted] = useState(false);
    const[loadingDelete, setLoadingDelete] = useState(false);
    const[popSaved, setPopSaved] = useState(false);
    const[saver, setSaver] = useState(true);
    const[popEdit, setPopEdit] = useState(false);
    const[popDelete, setPopDelete] = useState(false);
    const[popTagger, setPopTagger] = useState(false);
    const[postId, setPostId] = useState(false);
    const[tags, setTags] = useState([]);
    const[savedDiaryData, setSavedDiaryData] = useState({diaryId:diary._id});

    const user = JSON.parse(localStorage.getItem('profile'));



    const dispatch = useDispatch();

    

   

   




    function deleter(){
        
        try{

            console.log('del');
            setLoadingDelete(true);

            dispatch(deleteDiariesAction(diary._id, setPopDeleted));
            
            
            setTimeout( function() {setpopOptions(false)}, 2000);

        }
        catch(err){
            console.log(err);
        }
    }
     function saveDiary(){
        
        try{
            
            dispatch(saveDiariesAction(savedDiaryData, setPopSaved, setpopOptions));
            setSaver(false);
            

        }
        catch(err){
            console.log(err);
        }
    }
    const tagHandler = async()=>{

        setPopTagger(true);
        if(diary.tags.length>0) {

            try{
                console.log(diary.tags);

                const {data} = await axs.getTagsApi(diary.tags); 

                console.log(data);

                setTags(data);

                console.log(tags);
        
            } catch(error) {

                console.log(error.message);

            }
   
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
        <div className="absolute z-40 right-4 sm:right-12 top-20  rounded-b-xl bg-gray-100 dark:bg-gray-900">


                <Spring
                
                from={
                    { opacity: 0, x:-20}
                }
                
                to={
                { opacity: 1, x:0}
                
                }>  
                {styles => (
                <animated.div style={styles}>
          
            {saver && <div onClick= {saveDiary}>
            <PostOptionsRow Icon = {BookmarkIcon} title ="Save"/>
            </div>}
            <div className='flex items-center' onClick = {tagHandler}>
            <PostOptionsRow Icon = {TagIcon} title ="Tags" amount= {diary.tags.length} />
                
            
            </div>

            {user.result._id === diary.creator && 
            <div onClick = {()=> setPopDelete(true)} > 
            <PostOptionsRow 
             Icon = {TrashIcon} title ="Delete"/>
            </div>}
            <div>  
            <PostOptionsRow Icon = {ExclamationIcon}  title ="Report"/>
            </div>
            {user.result._id === diary.creator && 
            <div onClick = {()=> setPopEdit(true)}>
                <div onClick = {()=> setPostId(diary._id)}>  
                <PostOptionsRow Icon = {AiOutlineEdit} title ="Edit"/>
                </div> 
            </div>}

            </animated.div>
                      )}
                    </Spring>
           

            {/* </Link> */}
            {/* <EditDiaryModal diary={diary} setDiaryId={setDiaryId}/> */}
        </div>

        {/* ====DELETER ========*/}

        { popDelete && user.result._id === diary.creator &&  <div className=" fixed left-0 top-0 flex justify-center items-center z-40 w-full h-screen  bg-transparent text-base font-light ">
               <div className= "z-40 bg-gray-100 dark:bg-gray-900 rounded-xl p-8 text-center">
              
                    <p> <span className="font-bold">Delete the post: {diary.title}?</span></p>
                    <div className="flex justify-around items-center pt-4 m-auto text-white dark:text-gray-900">
                        
                        {loadingDelete === false &&
                            <>
                                <div onClick = {deleter} className= "bg-red-400 dark:bg-red-500 p-2 rounded-md cursor-pointer hover:bg-red-500 dark:hover:bg-red-600">
                                    Delete
                                </div>
                            
                                <div onClick = {()=> setpopOptions(false)} className= "bg-gray-400  p-2 rounded-md cursor-pointer hover:bg-gray-500 ">
                                    Cancel
                                </div>
                            </>
                        }
                           {loadingDelete === true &&
                            <>
                            
                                <div className= "bg-gray-400 space-x-1 flex items-center  p-2 rounded-md cursor-pointer hover:bg-gray-500 ">
                                    Deleting 
                                    <div className='px-1'>
                                        <BeatLoader size={7} color='white' loading/>
                                    </div>
                                </div>
                            </>
                            }
                    </div>
                             
                    
                </div>
                <div className="fixed opacity-70 top-0 z-10 left-0 w-full h-screen bg-gray-800"></div>
        </div> }

             {/* ====TAGGER ========*/}
        { popTagger &&  <div className="fixed left-0 top-0 flex justify-center items-center  z-40 flex w-full h-screen  bg-transparent text-base font-light text-gray-700 dark:text-gray-300">
               <div className= "h-96 z-40 sm:max-w-1/2 bg-gray-100 dark:bg-gray-900 rounded-xl p-8 text-center overflow-scroll">
              
                    <p> <span className="font-bold">Tags on {diary.title}: {diary.tags.length} aegayeguygauyga hiauhiuyaehgiae whiauewiahew ihuawehiuaehw iuahewiuhaei huiaewhiaew aehiuwhiuhiuh hiuaehiuaeh hiuaewhiaeuw </span> </p>
                    <div className="flex justify-around items-center p-4 m-auto">
                        
                        <div onClick = {()=>setPopTagger(false)} className= "bg-gray-200 dark:bg-gray-800 w-full  py-1 px-2 rounded-full cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-300">
                            close
                        </div>
                       
                  
                    </div>
                    <div onClick = {()=>setPopTagger(false)} className= "bg-gray-200 dark:bg-gray-800 text-white p-2 rounded-md cursor-pointer hover:bg-white">
                    
                    
                        {tags.length >0 &&
                            tags.map((tag) =>(
                                <PostTagRow key={tag._id} tag={tag}/>
                            ))
                        }
                         {diary.tags.length < 1 &&
                          <p>No tags</p>
                        }
                          {diary.tags.length > 0 && tags.length < 1  &&
                          <p>fetching tags...</p>
                         } 
                      
                            
                    </div>  
                   
                </div>
                <div className="fixed opacity-70  z-10 left-0 w-full h-screen bg-gray-800"></div>
        </div> }
        
        <div className="bg-gray-200 absolute top-20 left-0 z-40 w-full">
           {popEdit && <PostEdit diary={diary} setpopOptions ={setpopOptions}/>}
           </div>
                   
                     
        </div>
   
    )
}

export default PostoptionsModal;
