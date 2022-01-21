import SubscribersmodalRow from './SubscribersmodalRow';

function SubscribersModal({setshowSubscribers}) {
    return (
        <div className="fixed border-l-8 border-gray-200 p-4 sm:w-1/4 w-2/3 mt-4 sm:rounded-none sm:mt-2 right-0 sm:right-2 top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowSubscribers(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-cyan-500  bg-gray-100 items-center mt-4 mb-3 group">
                    <p className= "text-gray-500 text-center text-sm font-semibold group-hover:text-white">Subscribers</p> 
                </div>  
            
                <div className= "mb-60 border-gray-200 border-t">
                    <SubscribersmodalRow Src = "./assets/images/beyonce.jpeg" title ="#175m" PersonName= "@Beyonce:" Time= "2m ago"/>  
                    <SubscribersmodalRow Src = "./assets/images/jordan.jpeg" title ="#3k" PersonName= "@Michael Jordan:" Time= "4h ago"/>
                    <SubscribersmodalRow Src = "./assets/images/jolie.jpeg" title ="#111" PersonName= "@AngelinaJolie:" Time= "4h ago"/>
                    <SubscribersmodalRow Src = "./assets/images/milome.jpeg" title ="#2" PersonName= "@FelixMilome:" Time= "5h ago"/>
                    <SubscribersmodalRow Src = "./assets/images/tesla.png" title ="#14b" PersonName= "@Tesla:" Time= "13w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/jayz.jpeg" title ="#18k" PersonName= "@Jayz:" Time= "22w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/lilbaby.jpeg" title ="#15m" PersonName= "@LilBaby:" Time= "22w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/tesla.png" title ="#4m" PersonName= "@Tesla:" Time= "3d ago"/>
                    <SubscribersmodalRow Src = "./assets/images/lilbaby.jpeg" title ="#5" PersonName= "@LilBaby:" Time= "6d ago"/>
                    <SubscribersmodalRow Src = "./assets/images/khabilame.jpeg" title ="#6b" PersonName= "@KhabiLame:" Time= "1w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/beyonce.jpeg" title ="#7" PersonName= "@Beyonce:" Time= "2w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/jayz.jpeg" title ="#80" PersonName= "@Jayz:" Time= "2w"/>
                    <SubscribersmodalRow Src = "./assets/images/whitelogo.png" title ="#93" PersonName= "@Zoorura:" Time= "2w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/tesla.png" title ="#100" PersonName= "@Tesla:" Time= "2w"/>
                    <SubscribersmodalRow Src = "./assets/images/jolie.jpeg" title ="#11k" PersonName= "@AngelinaJolie:" Time= "3w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/milome.jpeg" title ="#12" PersonName= "@FelixMilome:" Time= "3w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/jordan.jpeg" title ="#13" PersonName= "@Michael Jordan:" Time= "11w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/khabilame.jpeg" title ="#16k" PersonName= "@KhabiLame:" Time= "21w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/whitelogo.png" title ="#190m" PersonName= "@Zoorura:" Time= "40w ago"/>
                    <SubscribersmodalRow Src = "./assets/images/tesla.png" title ="#20k" PersonName= "@Tesla:" Time= "41w ago"/>
       
            </div>
            </div>

        </div>
    )
}

export default SubscribersModal;
