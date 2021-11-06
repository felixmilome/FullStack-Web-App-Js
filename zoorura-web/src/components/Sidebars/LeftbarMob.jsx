import LeftbarmobRow from './LeftbarmobRow';


function LeftbarMob(){
return (
    <div className="rounded-xl visible md:invisible p-2 w-full m-x-4 bg-gray-200 border-r border-gray-300 z-40 fixed left-0 top-24 h-screen  overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">
                <div className="ml-1 font-bold text-gray-500 p-1">
                    Hall of Fame Ranks
                </div>
            {/* People */}
            <div className="mb-60">
                <LeftbarmobRow Src = "./assets/images/jolie.jpeg" title ="#1" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <LeftbarmobRow Src = "./assets/images/milome.jpeg" title ="#2" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <LeftbarmobRow Src = "./assets/images/jordan.jpeg" title ="#3" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <LeftbarmobRow Src = "./assets/images/tesla.png" title ="#4" PersonName= "@Tesla:" Points= "3m aps"/>
                <LeftbarmobRow Src = "./assets/images/lilbaby.jpeg" title ="#5" PersonName= "@LilBaby:" Points= "2m aps"/>
                <LeftbarmobRow Src = "./assets/images/khabilame.jpeg" title ="#6" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <LeftbarmobRow Src = "./assets/images/beyonce.jpeg" title ="#7" PersonName= "@Beyonce:" Points= "2m aps"/>
                <LeftbarmobRow Src = "./assets/images/jayz.jpeg" title ="#8" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <LeftbarmobRow Src = "./assets/images/whitelogo.png" title ="#9" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <LeftbarmobRow Src = "./assets/images/tesla.png" title ="#10" PersonName= "@Tesla:" Points= "3k aps"/>
                <LeftbarmobRow Src = "./assets/images/jolie.jpeg" title ="#11" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <LeftbarmobRow Src = "./assets/images/milome.jpeg" title ="#12" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <LeftbarmobRow Src = "./assets/images/jordan.jpeg" title ="#13" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <LeftbarmobRow Src = "./assets/images/tesla.png" title ="#14" PersonName= "@Tesla:" Points= "3m aps"/>
                <LeftbarmobRow Src = "./assets/images/lilbaby.jpeg" title ="#15" PersonName= "@LilBaby:" Points= "2m aps"/>
                <LeftbarmobRow Src = "./assets/images/khabilame.jpeg" title ="#16" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <LeftbarmobRow Src = "./assets/images/beyonce.jpeg" title ="#17" PersonName= "@Beyonce:" Points= "2m aps"/>
                <LeftbarmobRow Src = "./assets/images/jayz.jpeg" title ="#18" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <LeftbarmobRow Src = "./assets/images/whitelogo.png" title ="#19" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <LeftbarmobRow Src = "./assets/images/tesla.png" title ="#20" PersonName= "@Tesla:" Points= "3k aps"/>
        </div>
    </div>
</div>
);
}
export default LeftbarMob;