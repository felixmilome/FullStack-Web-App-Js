import { PhoneIcon, VideoCameraIcon, XCircleIcon } from "@heroicons/react/outline"
import ReceivedBubble from "./ReceivedBubble.jsx"
import SentBubble from "./SentBubble.jsx";
function ContactMod() {
    return (
        <div className="border-gray-300 fixed top-24 xl:bottom-0 right-0 xl:right-2 m-auto w-full xl:w-1/4 h-screen xl:h-2/3 overflow-y-scroll bg-gray-200">
            {/* Top Part */}
            <div className="fixed top-24 xl:top-36 z-20 
            border-b-2 border-gray-200
             bg-gray-100 p-1
             w-full xl:w-1/4  flex  
             justify-between items-center">

                <div className="flex items-center space-x-2
                 bg-transparent justify-around 
                 p-0.5 px-2 rounded-full 
                 text-xs
                  font-bold
                   text-gray-500">
                    <img src="./assets/images/mercy.jpeg" alt="DP" className="rounded-full object-cover h-8 w-8 m-0.5"/>    
                    <p>@anonimous</p>
                </div>
                <div className="mx-5 space-x-4 sm:space-x-2 bg-transparent flex items-center justify-around">
                    <div className="hover:bg-cyan-400
                     p-1 rounded-full cursor-pointer group">
                        <VideoCameraIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                    <div className="hover:bg-cyan-400
                     p-1 rounded-full cursor-pointer group">
                        <PhoneIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                    <div className="hover:bg-gray-300
                     p-1 rounded-full cursor-pointer group">
                        <XCircleIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                </div>

            </div>
            <div className= "p-2 my-24 w-full h-screen">
                <ReceivedBubble ReceivedMessage="Hello Sir Milome"/>
                <SentBubble SentMessage="I am Fine"/>
                <SentBubble SentMessage="Sema."/>
                <ReceivedBubble ReceivedMessage="I am fine too. And very Despa!
                    You are a great artist and
                    the best in the world. We
                    will build twin toilets."/>
                <SentBubble SentMessage="Pole."/>
                <ReceivedBubble 
                ReceivedMessage=" You didnt hear me. I am very Despa please."/>

            </div>
        </div>
    )
}

export default ContactMod;
