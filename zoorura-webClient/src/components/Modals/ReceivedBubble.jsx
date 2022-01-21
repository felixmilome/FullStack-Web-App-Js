
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faPrayingHands} from "@fortawesome/free-solid-svg-icons";

function  ReceivedBubble({ReceivedMessage}) {
    return (
        <div className="p-1 bg-transparent flex justify-start items-center">
           
           {/* <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                <TrashIcon className="group-hover:text-white text-gray-300 p-1"/>
            </div>    */}
            <div className="flex justify-start max-w-3/4 bg-transparent p-1 sm:w-2/3">
                    <div className="m-auto rounded-full bg-pink-100">
                        <div className="flex opacity-90 justify-center p-1 text-sm font-light">
                            <div style={{wordBreak: 'break-word'}}  className="p-3 max-w-xs  bg-gray-100 rounded-t-xl rounded-br-xl bg-gray-100 text-gray-600">
                                <p>{ReceivedMessage}</p>
                             </div>
                        </div>
                        
                    </div>
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                <FontAwesomeIcon icon={faPrayingHands} size ={'2x'} className="group-hover:text-white text-gray-300 p-1.5"/>
            </div>

            

        </div>
        
    )
}

export default ReceivedBubble;
