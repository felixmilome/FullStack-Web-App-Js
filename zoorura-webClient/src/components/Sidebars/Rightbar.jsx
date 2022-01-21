import RightbarRow from './RightbarRow.jsx';
import { SearchIcon} from '@heroicons/react/outline'

function Rightbar(){
return (
    <div className="invisible xl:visible p-2 m-3 w-1/4 m-x-4 bg-transparent border-l border-gray-300 z-10 fixed right-0 top-10 h-screen  overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">
          
            {/* space */}
            <div className= "h-16">
                <p></p>
                </div>
                  {/* Heading */}
            <div className="bg-gradient-to-r bg-gray-300 shadow-xl hover:from-pink-500 hover:to-yellow-500 fixed top-20 mt-2 mx-6 p-1 rounded-full w-1/5 flex items-center">
                <SearchIcon className=" h-6 w-6 text-white "/>
                <p className= "ml-16 text-white text-sm font-semibold">Contacts</p>
                
            </div>
            {/* Contacts People */}
            <div className="mb-60">
                <RightbarRow Src = "./assets/images/jolie.jpeg" title ="#111" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <RightbarRow Src = "./assets/images/milome.jpeg" title ="#2" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <RightbarRow Src = "./assets/images/jordan.jpeg" title ="#13" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <RightbarRow Src = "./assets/images/tesla.png" title ="#94" PersonName= "@Tesla:" Points= "3m aps"/>
                <RightbarRow Src = "./assets/images/lilbaby.jpeg" title ="#5" PersonName= "@LilBaby:" Points= "2m aps"/>
                <RightbarRow Src = "./assets/images/khabilame.jpeg" title ="#6" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <RightbarRow Src = "./assets/images/beyonce.jpeg" title ="#907" PersonName= "@Beyonce:" Points= "2m aps"/>
                <RightbarRow Src = "./assets/images/jayz.jpeg" title ="#8k" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <RightbarRow Src = "./assets/images/whitelogo.png" title ="#9" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <RightbarRow Src = "./assets/images/tesla.png" title ="#10m" PersonName= "@Tesla:" Points= "3k aps"/>
                <RightbarRow Src = "./assets/images/jolie.jpeg" title ="#81" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <RightbarRow Src = "./assets/images/milome.jpeg" title ="#192" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <RightbarRow Src = "./assets/images/jordan.jpeg" title ="#143" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <RightbarRow Src = "./assets/images/tesla.png" title ="#14.9k" PersonName= "@Tesla:" Points= "3m aps"/>
                <RightbarRow Src = "./assets/images/lilbaby.jpeg" title ="#15m" PersonName= "@LilBaby:" Points= "2m aps"/>
                <RightbarRow Src = "./assets/images/khabilame.jpeg" title ="#16b" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <RightbarRow Src = "./assets/images/beyonce.jpeg" title ="#17m" PersonName= "@Beyonce:" Points= "2m aps"/>
                <RightbarRow Src = "./assets/images/jayz.jpeg" title ="#18k" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <RightbarRow Src = "./assets/images/whitelogo.png" title ="#190k" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <RightbarRow Src = "./assets/images/tesla.png" title ="#20b" PersonName= "@Tesla:" Points= "3k aps"/>
            </div>
    </div>
</div>
);
}
export default Rightbar;