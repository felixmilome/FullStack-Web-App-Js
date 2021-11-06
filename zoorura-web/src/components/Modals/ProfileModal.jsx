import ProfilemodalRow from "./ProfilemodalRow.jsx"
import {
    AdjustmentsIcon,
    CreditCardIcon,
    LogoutIcon,
    QuestionMarkCircleIcon,
   
    } from '@heroicons/react/outline'



function ProfileModal({setshowProfile}) {
    return (
        <div className="fixed border-l-8 border-gray-200 p-4 sm:w-1/4 w-1/2 mt-4 rounded-xl sm:rounded-none sm:mt-2 right-3 sm:right-2 top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowProfile(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-gray-100  bg-transparent items-center mt-4 mb-3 group">
                <img src="./assets/images/milome.jpeg" alt="DP" className="mx-auto rounded-full group-hover:text-white h-8 w-8"/>
                    <p className= "text-gray-500 leading-3 text-center text-sm font-bold">Visit Portfolio</p> 
                   <div className="bg-gray-100 rounded-md py-1 items-center"> 
                    <p className= "text-gray-500 leading-4 text-center text-xs font-light">Rank: #3</p> 
                    <p className= "text-gray-500 leading-3 text-center text-xs font-semibold">30b aps</p>
                    </div>
                    
                </div>  
            
                <div className= "mb-60 border-gray-200 border-t">
                <ProfilemodalRow Icon = {CreditCardIcon} title ="Wallet"/>
                <ProfilemodalRow Icon = {AdjustmentsIcon} title ="Settings"/>
                <ProfilemodalRow Icon = {QuestionMarkCircleIcon} title ="Help"/>
                <ProfilemodalRow Icon = {LogoutIcon} title ="Logout"/>
       
            </div>
            </div>

        </div>
    )
}

export default ProfileModal;
