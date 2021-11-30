
import {    SearchIcon,
             
            ChatIcon, 
            BellIcon,
            ShoppingCartIcon,
            HashtagIcon,
            UserAddIcon} from '@heroicons/react/outline'


import HeaderRightIcon from './HeaderRightIcon.jsx'
import { useState } from 'react';
import ProfileModal from '../Modals/ProfileModal.jsx';
import OutsideClickHandler from 'react-outside-click-handler';
import SubscribersModal from '../Modals/SubscribersModal.jsx';
import NotificationsModal from '../Modals/NotificationsModal.jsx';
import CartModal from '../Modals/CartModal.jsx';
import LeftbarMob from '../Sidebars/LeftbarMob.jsx';
import RightbarMob from '../Sidebars/RightbarMob.jsx';
import {Link} from 'react-router-dom';

function Header() {

    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const[popProfile, setpopProfile] = useState(false);
    const[popSubscribers, setpopSubscribers] = useState(false);
    const[popNotifications, setpopNotifications] = useState(false);
    const[popCart, setpopCart] = useState(false);
    const[popRankings, setpopRankings] = useState(false);
    const[popContacts, setpopContacts] = useState(false);
    

    return (
        
        <div className= "sticky top-0 z-50">
        <div className= "sticky top-0 z-50 bg-gray-200 border-b-2 border-gray-300 p-2 lg:px-6 lg:py-3 shadow-md ">
        <div className= "flex items-center  space-x-2 justify-between">
            {/*Left*/}
            <Link to='/'>
                <div className="cursor-pointer  rounded-full hover:bg-gray-100 bg-transparent flex items-center justify-between">
                            
                            <div className= 'rounded-full items-center text-gray-200 bg-gray-100 object-cover'>
                            <img src="./assets/images/whitelogo.png" alt="DP" className="p-0.5 rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                            </div>
                    <h1 className= "m-1 inline-flex text-base font-light text-gray-400">Zoorura</h1>
    
                </div>
           </Link>
            
            {/* Mid */}
            
                <div className="hidden sm:flex items-center rounded-full w-1/3 mx-1 bg-gray-100 sm:pr-4">
                    <div className="p-2 sm:p-3 bg-gray-400 hover:bg-cyan-400 rounded-full items:center"> <SearchIcon className= 'h-6 text-white'/></div>
                    <input className ="hidden sm:w-full bg-transparent sm:pr-1 h-10 md:inline-flex ml-1 bg-transparent items-center outline-none font-light placeholder-gray-400"
                     type="text"
                    placeholder="Search Zoorura"/>
                </div>
            

            {/*Header Right*/}
            { user &&
                <div className="flex items-center  bg-transparent sm:space-x-2 justify-end">
                       
                        {/* Subscribers Modal & Button */}
                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopSubscribers(false);
                            }}
                            >
                            <div 
                            onClick={ () => 
                            {setpopSubscribers(!popSubscribers)}
                            }>
                            <HeaderRightIcon Icon = {UserAddIcon} badge="1"/>
                            </div>
                            {popSubscribers && <SubscribersModal setshowSubscribers={setpopSubscribers}/>}
                            
                        </OutsideClickHandler>

                        {/* Notifications Modal */}

                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopNotifications(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {setpopNotifications(!popNotifications)}
                            }>
                            <HeaderRightIcon Icon = {BellIcon} badge="1"/>
                            </div>
                            {popNotifications && <NotificationsModal setshowNotifications={setpopNotifications}/>}
                            
                        </OutsideClickHandler>

                            {/* Chat Modal */}
                            <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopContacts(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {setpopContacts(!popContacts)}
                            }>
                                <HeaderRightIcon Icon = {ChatIcon} badge="3"/> 
                                </div>
                            {popContacts && <RightbarMob setshowContacts={setpopContacts}/>}
                            
                        </OutsideClickHandler>     

                        {/* Cart Modal */}
                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopCart(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {setpopCart(!popCart)}
                            }>
                                <HeaderRightIcon Icon = {ShoppingCartIcon} badge="2"/>
                        </div>
                        {popCart && <CartModal setshowCart={setpopCart}/>}
                            
                        </OutsideClickHandler>

                    {/*Profile Pic Modal && Button*/}
                  
                    <OutsideClickHandler     
                        onOutsideClick={() => {
                            setpopProfile(false);
                        }}
                        >
                        <div className="cursor-pointer inline-flex items-center justify-center p-1 rounded-full sm:hover:bg-gray-100 mx-1"
                     onClick={ () => 
                     {setpopProfile(!popProfile)}
                     }>
                       <img src={user.result.imageUrl} alt="DP" className="rounded-full h-7 w-7"/>
                        <span className="hidden md:inline-flex w-full mx-2 font-light text-sm">{user.result.name}</span>
                        </div>

                     {popProfile && <ProfileModal setshowProfile={setpopProfile}/>}
                    
                    </OutsideClickHandler>
                    
                    
                   
                    
                    
                    
                </div>
                }
            </div>

                <div className="xl:hidden  mx-3 items-center flex justify-around">
                    
                    {/* Rankings Leftbar Mobile Modal */}
                    <div>
                         <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopRankings(false);
                            }}
                            >
                            <div className="bg-transparent hover:bg-cyan-400 rounded-full p-2 group"
                            onClick={ () => 
                            {setpopRankings(!popRankings)}
                            }>
                            <HashtagIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/>
                            </div>
                            {popRankings && <LeftbarMob setshowRankings={setpopRankings}/>}
                            
                        </OutsideClickHandler> 
                    </div>
                
                    <div className="sm:hidden flex justify-center items-center rounded-full w-full mx-2 my-1 bg-gray-100">

                        
                        <div className="p-1 bg-gray-400 hover:bg-cyan-400 rounded-full items:center">
                             <SearchIcon className= 'h-6 text-white'/>
                            
                        </div>
                        <input className ="bg-transarent w-full h-7 md:inline-flex pl-2 pr-4 bg-transparent items-center outline-none font-light placeholder-gray-400"
                        type="text"
                        placeholder="Search Zoorura"/>
                       
                    </div>

                    {/* <div>
                              <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopContacts(false);
                            }}
                            >
                            <div className="bg-transparent hover:bg-cyan-400 rounded-full p-2 group"
                            onClick={ () => 
                            {setpopContacts(!popContacts)}
                            }>
                            <UsersIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/>
                            </div>
                            {popContacts && <RightbarMob setshowContacts={setpopContacts}/>}
                            
                        </OutsideClickHandler>    
                    </div> */}
                </div>

        </div>
                    
                   
            </div>
       
    
 
       
            
        
    )
}

export default Header;
