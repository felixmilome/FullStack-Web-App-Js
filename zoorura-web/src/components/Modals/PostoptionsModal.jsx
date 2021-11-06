import PostOptionsRow from "./PostOptionsRow.jsx";
import { BookmarkIcon, ExclamationIcon, TagIcon, TrashIcon } from '@heroicons/react/outline';
import EditDiaryModal from "./EditDiaryModal.jsx"
import {useDispatch} from 'react-redux';
import { deleteDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";

function PostoptionsModal({diary, setDiaryId}) {

    const dispatch = useDispatch();

    return (
       
        <div className="absolute right-4 sm:right-12 top-20 opacity-90 rounded-b-xl bg-gray-100">
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
            {/* <EditDiaryModal diary={diary} setDiaryId={setDiaryId}/> */}
        </div>
        
       
    )
}

export default PostoptionsModal;
