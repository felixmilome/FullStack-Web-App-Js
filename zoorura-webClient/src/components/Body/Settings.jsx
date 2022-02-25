import { useState } from "react";
import { MdOutlineCancel, MdSecurity } from "react-icons/md";

export const Settings = () => {
   
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [settingsFormData, setSettingsFormData] = useState({userName:user.result.userName, email: user.result.email, bio: user.result.bio, password: '', confirmPassword:''});
    
    

    const handleSubmit = () =>{ 
        console.log('submitted')
    } 

  return (
    <div className="fixed text-gray-600 font-bold top-12 bg-transparent pt-8 pb-48 left-0 w-full flex justify-center z-20 max-h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

            <div className="w-full lg:w-2/5 bg-gray-100 rounded-md shadow-xl m-2 h-full">
            
            <form onSubmit={handleSubmit}>
                        <div className= "pt-3 pb-1 flex items-center justify-around">
                            <img src={user.result.dpUrl} alt="DP" className="rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                        </div>  
                        <div className="p-1 text-center bg-transparent">
                            <p>Profile Settings</p>                       
                        </div>

         


                        {/*========= Profile Settings=============== */}
                    <div className="p-3 text-sm space-y-1"> 

                            {/* UserName*/}
                            <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Username:</p>
                                <input  onChange={(e)=>setSettingsFormData({...settingsFormData, userName:e.target.value})}
                                value= {settingsFormData.userName}
                                name='username' className= "w-3/4 sm:w-5/6 bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Change Username"/>
                                </div>
                            </div>

                            {/* Email*/}
                            <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                                <input onChange={(e)=>setSettingsFormData({...settingsFormData, email:e.target.value})}
                                value= {settingsFormData.email}
                                name='email' className= "w-3/4 sm:w-5/6 bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Change Email"/>
                                </div>
                            </div>
                            
                            {/*Bio*/}
                            <div className= "flex justify-between relative w-full pb-2">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Bio:</p>
                                <textarea onChange={(e)=>setSettingsFormData({...settingsFormData, bio:e.target.value})} value= {settingsFormData.bio}
                                name='bio' className= " resize-none w-3/4 sm:w-5/6 bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Change Bio"/>
                                </div>
                            </div>
                    </div>




                     {/*========= Security Settings=============== */}
                     <div className= "pt-3 pb-1 flex items-center justify-around">
                        <MdSecurity size={20} className= "text-gray-500"/>
                    </div> 
                     <div className="p-1 text-center bg-transparent">
                            <p>Security Settings</p>                        
                    </div>


                     {/*========= Security Settings Inputs=============== */}
                    <div className="p-3 text-sm space-y-1">

                            {/* Password*/}
                            <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Change Password:</p>
                                <input  onChange={(e)=>setSettingsFormData({...settingsFormData, password:e.target.value})}
                                name='password' className= "w-3/4 bg-gray-100 border border-gray-300 p-2 rounded-md" type="password" placeholder= "Change Password"/>
                                </div>
                            </div>
                            {/* ConfirmPassword*/}
                             <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Confirm Password:</p>
                                <input  onChange={(e)=>setSettingsFormData({...settingsFormData, confirmPassword:e.target.value})}
                                name='Confirmpassword' className= "w-3/4  bg-gray-100 border border-gray-300 p-2 rounded-md" type="password" placeholder= "Confirm Password"/>
                                </div>
                            </div>
                          

                      

                           
        
                    </div>
                

                    <div className='flex justify-between'>
                            <button 
                            
                            
                            type='submit' className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                bg-gradient-to-r hover:from-pink-500
                                hover:to-yellow-500 flex
                                mx-auto rounded-md
                                    justify-center 
                                    text-white text-sm cursor-pointer
                                    font-semibold p-1 mb-4">
                                
                                <p>Submit Changes</p> 

                            </button>
                        
                        
                            
                    </div>
                    
            </form>
            </div>
          

        </div>
  )
}

