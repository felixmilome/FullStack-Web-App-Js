import LeftbarRow from './LeftbarRow';


function Leftbar(){
return (
    <div className="invisible xl:visible p-2 my-1 w-1/4 m-x-4 bg-transparent border-r border-gray-300 z-40 fixed left-0 top-10 h-screen  overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">
            {/* space */}
        <div className= "h-16">
            <p></p>
        </div>
            {/* Heading */}
            <div className="bg-gradient-to-r from-pink-300 to-cyan-400   shadow-xl hover:from-pink-500 hover:to-yellow-500 fixed top-16 left-0 my-2 p-3 cursor-pointer  w-1/4 flex justify-center">
                <p className= "text-white text-sm font-semibold"># Hall of Fame Ranks</p>
                
            </div>
            {/* People */}
            <div className="mb-60">
                <LeftbarRow Src = "./assets/images/jolie.jpeg" title ="#1" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <LeftbarRow Src = "./assets/images/milome.jpeg" title ="#2" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <LeftbarRow Src = "./assets/images/jordan.jpeg" title ="#3" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <LeftbarRow Src = "./assets/images/tesla.png" title ="#4" PersonName= "@Tesla:" Points= "3m aps"/>
                <LeftbarRow Src = "./assets/images/lilbaby.jpeg" title ="#5" PersonName= "@LilBaby:" Points= "2m aps"/>
                <LeftbarRow Src = "./assets/images/khabilame.jpeg" title ="#6" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <LeftbarRow Src = "./assets/images/beyonce.jpeg" title ="#7" PersonName= "@Beyonce:" Points= "2m aps"/>
                <LeftbarRow Src = "./assets/images/jayz.jpeg" title ="#8" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <LeftbarRow Src = "./assets/images/whitelogo.png" title ="#9" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <LeftbarRow Src = "./assets/images/tesla.png" title ="#10" PersonName= "@Tesla:" Points= "3k aps"/>
                <LeftbarRow Src = "./assets/images/jolie.jpeg" title ="#11" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <LeftbarRow Src = "./assets/images/milome.jpeg" title ="#12" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <LeftbarRow Src = "./assets/images/jordan.jpeg" title ="#13" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <LeftbarRow Src = "./assets/images/tesla.png" title ="#14" PersonName= "@Tesla:" Points= "3m aps"/>
                <LeftbarRow Src = "./assets/images/lilbaby.jpeg" title ="#15" PersonName= "@LilBaby:" Points= "2m aps"/>
                <LeftbarRow Src = "./assets/images/khabilame.jpeg" title ="#16" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <LeftbarRow Src = "./assets/images/beyonce.jpeg" title ="#17" PersonName= "@Beyonce:" Points= "2m aps"/>
                <LeftbarRow Src = "./assets/images/jayz.jpeg" title ="#18" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <LeftbarRow Src = "./assets/images/whitelogo.png" title ="#19" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <LeftbarRow Src = "./assets/images/tesla.png" title ="#20" PersonName= "@Tesla:" Points= "3k aps"/>
        </div>
    </div>
</div>
);
}
export default Leftbar;