import { useState } from 'react';
import Cropper from "react-easy-crop";
import {getCroppedImg} from "../Midwares/cleaners/imageCrop.js";

import {BeatLoader} from "react-spinners";

import {MdFileUpload } from "react-icons/md";
import {IoIosImages } from "react-icons/io";
import {TiDocumentDelete} from "react-icons/ti";
import {ImCancelCircle} from "react-icons/im";

import { dpAction } from "../Midwares/rdx/actions/profileAction";
import {useDispatch} from 'react-redux';
import{useNavigate} from 'react-router-dom';

//firebase
import {storage} from "../Midwares/firebase/config";
import {ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

export const DpCropper = ({dpCropper, setdpCropper}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const[dpPreview, setdpPreview] = useState('none');
    const[dpPreviewUrl, setdpPreviewUrl] = useState('none');
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const[dpCrop, setdpCrop] = useState({x:0, y:0});
    const[dpZoom, setdpZoom] = useState(1);
    const[dpCroppedArea, setdpCroppedArea] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const [progress, setProgress] = useState(0);
    const [loader, setLoader]= useState(false);
  

    const dpUploader = async (croppedDp, id) =>{
        
        if (!dpPreview) return;
        const storageRef = ref (storage, `/diaryfiles/${dpPreview.name}`);
        const uploadTask=uploadBytesResumable(storageRef,croppedDp);
    
        return new Promise((resolve, reject) => {

                uploadTask.on("state-changed", (snapshot)=>{
                        const prog = Math.round(
                                ((snapshot.bytesTransferred/ snapshot.totalBytes)* 100)
                            );
                            setProgress(prog);
                    },
                    (err) => console.log(err),
                    () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                            .then((url)=>{ 
                                    console.log("wuhuuu");
                                    const dpData = {id:id, dp:url};
                                    resolve(dpData);    
                                }); 
                        }
                );

        });

    }

   

    const ondpCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        console.log(croppedAreaPercentage, croppedAreaPixels);
        setdpCroppedArea (croppedAreaPixels);
    };



    const handleImage = async (e)=>{
        /// do something if not set
        e.preventDefault();
        
        const image = e.target.files[0];

        if(!image) return;

        setdpPreview (image);
        setdpPreviewUrl (URL.createObjectURL(image));
        console.log(image);
        console.log(dpPreview);
        console.log(dpPreviewUrl);
         
        
            
    };

    const handleSubmit = async()=>{

        try {

            setLoader(true);
            
            const croppedDp = await getCroppedImg(dpPreviewUrl, dpCroppedArea);
            const id = user.result._id
            console.log('donee', { croppedDp });
            //setCroppedImage(croppedDp);

            const dpData= await dpUploader (croppedDp,id);

            console.log(dpData);


            dispatch(dpAction (dpData, navigate));
            // console.log(user.result);


        } catch (e) {
        console.error(e)
        }       
            
    };

   
    return (
        <div className= "fixed w-full h-full z-50 left-0 top-0 bg-transparent ">
            <div className= "w-full h-full bg-black opacity-90  flex">
                <div className="p-3 m-auto bg-black w-screen opacity-90 flex justify-center ">
                    <div>

                        <div className="flex justify-center ">
                            {dpPreview=='none' ?
                                    <img src={user.result.dpUrl} alt="DP" className="p-0.5 h-96 w-96 object-contain"/> :

                                    <Cropper 
                                        image={dpPreviewUrl}
                                        crop ={dpCrop}
                                        zoom ={dpZoom}
                                        cropShape="round"
                                        aspect = {1}
                                        onCropChange={setdpCrop}
                                        onZoomChange={setdpZoom}
                                        onCropComplete={ondpCropComplete}                            
                                    />
  
                            }     
                        </div>

                        <div className="absolute bottom-8 items-center opacity-90 right-0 w-full text-sm z-50 flex justify-around py-4">

                            {!loader &&
                                <>
         
                                    {user.result.dpUrl != "./assets/images/avatar.png" && dpPreview =='none'?
                                        <div className="p-1 text-white rounded bg-red-700 items-center flex cursor-pointer hover:bg-red-600">
                                            <div className="px-0.5"> Empty </div>
                                            <TiDocumentDelete/>
                                        </div>:<></>
                                    }


                                    <input onChange={handleImage} className= "hidden" id='dpUpload' type="file"/> 
                                    <label htmlFor= 'dpUpload'>
                                        <div className="p-1 text-white rounded bg-blue-700 items-center flex cursor-pointer hover:bg-blue-500">
                                        <div className="px-0.5">Change</div>
                                            <MdFileUpload/>
                                        </div>
                                    </label>

                                    { dpPreview !='none' ?
                                        <div onClick= {handleSubmit} className="p-1 text-white rounded bg-teal-700 items-center flex cursor-pointer hover:bg-teal-500">
                                        <div className="px-0.5">  Approve </div>
                                            <IoIosImages/>      
                                        </div> : <></>}

                                    <div onClick= {()=>setdpCropper(!dpCropper)} className="p-1 text-white rounded bg-transparent border border-white items-center flex cursor-pointer hover:bg-gray-800">
                                    <div className="px-0.5">  Cancel</div>
                                    <ImCancelCircle/>
                                    </div> 
                                </>
                            }

                            {loader &&
                                <div  className="p-1 text-white bg-transparent items-center flex">
                                        <div>
                                            <div className= "flex justify-center"> <BeatLoader size={24} color='white' loading/></div>
                                            <p className= 'text-sm text-xs'> Updating: <b>{progress}%</b></p>     
                                        </div>        
                                </div>  
                            }       

                        </div>
                    </div>
                </div> 
            </div>
           
        </div>
    )
}


