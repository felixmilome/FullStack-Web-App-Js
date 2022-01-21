import { CameraIcon} from "@heroicons/react/solid";
import{useState} from 'react';
import FileBase from 'react-file-base64';




import axios from 'axios';


import {useDispatch} from 'react-redux'; 
import { postDiariesAction } from "../Midwares/rdx/actions/diariesAction";



function CreatediaryModal() {
    const [diariesData, setdiariesData] = useState({
        title:'', caption:'', file: '', publicity:'',
    }); 
    const dispatch = useDispatch();

    const handleSubmit =(e)=>{
        e.preventDefault();
  
       
        //dispatch(postDiariesAction (diariesData)); 
    }

    return (
        <div className="space-y-5 w-4/5 xl:w-1/3 bg-gray-200 bg-opacity-100 max-h-screen shadow-xl items-center  rounded-xl z-40 fixed top-24 m-4">
         

            {/* Cyan Heading */}
            <div className="bg-gradient-to-r from-pink-300 to-cyan-400  rounded-md border-b-2 border-gray-300">
                <p className="text-center p-3 font-bold text-white shadow-md">Diary Post</p>
            </div>

        {/*----- FORM------------------------- */}
        <form onSubmit={handleSubmit}>
            <div className= "flex justify-center items-center p-0.5">
                <img src="./assets/images/milome.jpeg" alt="DP" className="rounded-full h-7 w-7"/>
            
            <select 
             name= "publicity"
            value= {diariesData.publicity}
            onChange={(e)=> setdiariesData({...diariesData, publicity: e.target.value})}
            
            className="m-2 flex justify-center items-center font-semibold text-xs text-gray-500 outline-none bg-gray-100 rounded-md p-1 border-none">
                <option value="public"> Public/ Everyone </option>
                <option value="subscribers">My Subscribers </option>
                <option value="private"> Private/ Only Me </option>
            </select> 
            </div>
            <div className="">


                 {/* File Upload------------ */}
   
                        <div className= "items-center bg-gray-100 rounded-full p-3 text-gray-300 mx-auto w-20 h-20">
                       
                        <FileBase
                             
                            type="file"
                            multiple={false}
                            onDone={({base64})=> setdiariesData ({...diariesData, file:base64})}
                            
                        />
                            <CameraIcon className="m-auto h-10 w-10"/>
                            <p className= "text-center text-xs font-base text-gray-400">Photo</p>
                        </div>
                 
                    {/*-- Title------------ */}
                        <div className="flex justify-center">
                            <input name= "title"
                             value= {diariesData.title}
                             onChange={(e)=> setdiariesData({...diariesData, title: e.target.value})}
                            placeholder="Enter Title" className="text-center text-gray-700 font-medium outline-none  mx-4 my-3 w-full px-4 p-1 sm:py-2 rounded bg-gray-100"/>
                        </div>
                    {/* ---Content---------------  */}
                        <div className="px-3 items-center flex justify-center">
                            <textarea name= "caption"
                             value= {diariesData.caption}
                             onChange={(e)=> setdiariesData({...diariesData, caption: e.target.value})}
                             placeholder=" Enter Caption" className="resize-none h-28 sm:h-32 text-gray-700 font-light outline-none  m-1 w-full bg-gray-100 px-4 py-2 rounded-md"/>
                        </div>
                        
                    {/* Button------------- */}
                        <button type='submit' className="items-center mx-auto bg-gradient-to-r from-pink-300 to-cyan-400 
                        bg-gradient-to-r hover:from-pink-500
                        hover:to-yellow-500 my-3 flex
                        mx-auto w-1/3 rounded-full
                            my-2 justify-center 
                            text-white cursor-pointer
                            font-semibold p-1">
                            Preview
                        </button>

               
             
                

            </div>
            </form>
        </div>
    )
}

export default CreatediaryModal;
