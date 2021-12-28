import { useState } from 'react';
import Cropper from "react-easy-crop";

export const DpCropper = ({setdpCropper}) => {

    const[dpPreview, setdpPreview] = useState('none');
    const[dpPreviewUrl, setdpPreviewUrl] = useState('none');
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const[dpCrop, setdpCrop] = useState({x:0, y:0});
    const[dpZoom, setdpZoom] = useState(1);
    const[dpCroppedArea, setdpCroppedArea] = useState(null);

    const ondpCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        console.log(croppedAreaPercentage, croppedAreaPixels);
        setdpCroppedArea (croppedAreaPixels);
    };

    const handleImage = async (e)=>{

        e.preventDefault();
        const image = e.target.files[0];

        setdpPreview (image);
        setdpPreviewUrl (URL.createObjectURL(image));
        console.log(image);
        console.log(dpPreview);
        console.log(dpPreviewUrl);
        
        
            
    };

   
    return (
        <div className= "fixed w-full h-full z-50 left-0 top-0 bg-transparent ">
            <div className= "w-full h-full bg-transparent  flex">
                <div className="p-3 m-auto bg-transparent w-screen flex justify-center ">
                    <div>
                        <div className="flex justify-center ">
                            {dpPreview=='none' ?
                            <img src={user.result.dpUrl} alt="DP" className="p-0.5 rounded-full h-96 w-96 object-contain"/> :
                            //<img src={dpPreviewUrl} alt="DP0" className="p-0.5 h-96 object-contain"/>
                            
                            <Cropper 
                                image={dpPreviewUrl}
                                crop ={dpCrop}
                                zoom ={dpZoom}
                                aspect = {1}
                                onCropChange={setdpCrop}
                                onZoomChange={setdpZoom}
                                onCropComplete={ondpCropComplete}                            
                            />
                            
                            

                            }
                        </div>
                        <div className="absolute bottom-8 opacity-80 right-0 w-full z-50 flex justify-center space-x-3 p-2">

                            

                            <input onChange={handleImage} className= "hidden" id='dpUpload' type="file"/>
                            <label for= 'dpUpload'>
                                <div  className="p-2 text-white rounded-md bg-gray-700 items-center flex">
                                    Upload
                                </div>
                            </label>

                            <div className="p-2 font-semibold text-white rounded-md bg-cyan-600 items-center flex">
                                Make Profile Picture
                            </div>

                        </div>
                    </div>
                </div> 
            </div>
           
        </div>
    )
}


