import NotificationsmodalRow from './NotificationsmodalRow';

function NotificationsModal({setshowNotifications}) {
    return (
        <div className="fixed border-l-8 border-gray-200 p-4 sm:w-1/4 w-2/3 mt-4  sm:mt-2 right-0 sm:right-1.5 rounded-md top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowNotifications(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-cyan-500  bg-gray-100 items-center mt-4 mb-3 group">
                    <p className= "text-gray-500 text-center text-sm font-semibold group-hover:text-white">Notifications</p> 
                </div>  
            
                <div className= "mb-60 border-gray-200 border-t">
                <NotificationsmodalRow Src = "./assets/images/lilbaby.jpeg" title ="#5" PersonName= "@LilBaby:" Note="Clap-tipped on Chat" Time= "6d ago"/>
                    <NotificationsmodalRow Src = "./assets/images/khabilame.jpeg" title ="#6b" PersonName= "@KhabiLame:" Note="Displayed your Blog" Time= "1w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/beyonce.jpeg" title ="#7" PersonName= "@Beyonce:" Note="Clap-tipped your Portfolio" Time= "2w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/jayz.jpeg" title ="#80" PersonName= "@Jayz:" Note="Clap-tipped your Portfolio" Time= "2w"/>
                    <NotificationsmodalRow Src = "./assets/images/lilbaby.jpeg" title ="#15m" PersonName= "@LilBaby:" Note="Clap-tipped your Portfolio" Time= "20w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/khabilame.jpeg" title ="#16k" PersonName= "@KhabiLame:" Note="Clap-tipped your Portfolio" Time= "21w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/beyonce.jpeg" title ="#175m" PersonName= "@Beyonce:" Note="Clap-tipped your Portfolio" Time= "21w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/whitelogo.png" title ="#93" PersonName= "@Zoorura:" Note="Clap-tipped on Chat" Time= "2w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/tesla.png" title ="#100" PersonName= "@Tesla:" Note="Clap-tipped your Portfolio" Time= "2w"/>
                    <NotificationsmodalRow Src = "./assets/images/jolie.jpeg" title ="#111" PersonName= "@AngelinaJolie:" Note="Reviewed" Time= "3m ago"/>
                    <NotificationsmodalRow Src = "./assets/images/milome.jpeg" title ="#2" PersonName= "@FelixMilome:" Note="Clap-tipped your Post" Time= "2h ago"/>
                    <NotificationsmodalRow Src = "./assets/images/jordan.jpeg" title ="#3k" PersonName= "@Michael Jordan:" Note="Clap-tipped your Review" Time= "4h ago"/>
                    <NotificationsmodalRow Src = "./assets/images/tesla.png" title ="#4m" PersonName= "@Tesla:" Note="Clap-tipped your Video" Time= "3d ago"/>
                    <NotificationsmodalRow Src = "./assets/images/jolie.jpeg" title ="#11k" PersonName= "@AngelinaJolie:" Note="Clap-tipped your Portfolio" Time= "3w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/milome.jpeg" title ="#12" PersonName= "@FelixMilome:" Note="Clap-tipped your Portfolio" Time= "3w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/jordan.jpeg" title ="#13" PersonName= "@Michael Jordan:" Note="Clap-tipped your Portfolio" Time= "11w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/tesla.png" title ="#14b" PersonName= "@Tesla:" Note="Clap-tipped your Portfolio" Time= "13w ago"/> 
                    <NotificationsmodalRow Src = "./assets/images/jayz.jpeg" title ="#18k" PersonName= "@Jayz:" Note="Clap-tipped your Portfolio" Time= "22w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/whitelogo.png" title ="#190m" PersonName= "@Zoorura:" Note="Clap-tipped your Portfolio" Time= "40w ago"/>
                    <NotificationsmodalRow Src = "./assets/images/tesla.png" title ="#20k" PersonName= "@Tesla:" Note="Clap-tipped your Portfolio" Time= "41w ago"/>
       
            </div>
            </div>

        </div>
    )
}

export default NotificationsModal;
