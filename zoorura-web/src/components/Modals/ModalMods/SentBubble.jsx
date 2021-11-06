import { DotsVerticalIcon} from "@heroicons/react/outline";

function SentBubble({SentMessage}) {
    return (
        <div className="bg-transparent space-x-1 flex justify-end items-center">
{/*                 
                <div className="flex justify-center items-center bg-gray-100 rounded-full h-10 w-10 hover:bg-cyan-400 group cursor-pointer">
                    <FontAwesomeIcon icon={faPrayingHands} size ={'2x'} className="group-hover:text-white text-gray-300 p-1.5"/>
                </div> */}
                
                    <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                        <DotsVerticalIcon className="group-hover:text-white text-gray-300 p-1.5"/>
                    </div>
                
            
            <div className="flex justify-end p-2 text-sm font-light">
        
                <div className="my-0 p-3 max-w-xs bg-cyan-500 rounded-t-xl rounded-bl-xl bg-gray-100 text-white">
                    <p>{SentMessage}</p>
                </div>
 
            </div>

        </div>
    )
}

export default SentBubble;
