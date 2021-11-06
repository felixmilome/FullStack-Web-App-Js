import RightbarmobRow from './RightbarmobRow.jsx';
import ContactMod from '../Modals/ModalMods/ContactMod.jsx';
function RightbarMob(){
return (
    <div className=" p-7 w-full sm:w-1/4 m-x-4 bg-gray-200 z-10 fixed right-0 top-24 sm:top-20 h-screen overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">

        <div className="ml-1 font-bold text-gray-500 p-1">
        Contacts
        </div>
          
            {/* Contacts People */}
            <div className="mb-60">
                <ContactMod/>
                <RightbarmobRow Src = "./assets/images/jolie.jpeg" title ="#111" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <RightbarmobRow Src = "./assets/images/milome.jpeg" title ="#2" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <RightbarmobRow Src = "./assets/images/jordan.jpeg" title ="#13" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <RightbarmobRow Src = "./assets/images/tesla.png" title ="#94" PersonName= "@Tesla:" Points= "3m aps"/>
                <RightbarmobRow Src = "./assets/images/lilbaby.jpeg" title ="#5" PersonName= "@LilBaby:" Points= "2m aps"/>
                <RightbarmobRow Src = "./assets/images/khabilame.jpeg" title ="#6" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <RightbarmobRow Src = "./assets/images/beyonce.jpeg" title ="#907" PersonName= "@Beyonce:" Points= "2m aps"/>
                <RightbarmobRow Src = "./assets/images/jayz.jpeg" title ="#8k" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <RightbarmobRow Src = "./assets/images/whitelogo.png" title ="#9" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <RightbarmobRow Src = "./assets/images/tesla.png" title ="#10m" PersonName= "@Tesla:" Points= "3k aps"/>
                <RightbarmobRow Src = "./assets/images/jolie.jpeg" title ="#81" PersonName= "@AngelinaJolie:" Points= "3b aps"/>
                <RightbarmobRow Src = "./assets/images/milome.jpeg" title ="#192" PersonName= "@FelixMilome:" Points= "2b aps"/>
                <RightbarmobRow Src = "./assets/images/jordan.jpeg" title ="#143" PersonName= "@Michael Jordan:" Points= "1.7b aps"/>
                <RightbarmobRow Src = "./assets/images/tesla.png" title ="#14.9k" PersonName= "@Tesla:" Points= "3m aps"/>
                <RightbarmobRow Src = "./assets/images/lilbaby.jpeg" title ="#15m" PersonName= "@LilBaby:" Points= "2m aps"/>
                <RightbarmobRow Src = "./assets/images/khabilame.jpeg" title ="#16b" PersonName= "@KhabiLame:" Points= "2m aps"/>
                <RightbarmobRow Src = "./assets/images/beyonce.jpeg" title ="#17m" PersonName= "@Beyonce:" Points= "2m aps"/>
                <RightbarmobRow Src = "./assets/images/jayz.jpeg" title ="#18k" PersonName= "@Jayz:" Points= "1.86m aps"/>
                <RightbarmobRow Src = "./assets/images/whitelogo.png" title ="#190k" PersonName= "@Zoorura:" Points= "1.8m aps"/>
                <RightbarmobRow Src = "./assets/images/tesla.png" title ="#20b" PersonName= "@Tesla:" Points= "3k aps"/>
            </div>
    </div>
</div>
);
}
export default RightbarMob;