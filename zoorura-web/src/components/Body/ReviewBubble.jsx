
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{faPrayingHands} from "@fortawesome/free-solid-svg-icons";

function ReviewBubble({Src,Name,Review}) {
    return (
      
   
            // Overall
        <div className="flex w-full justify-start items-center text-xs font-bold text-gray-600 rounded-md lg:max-w-none">
           
           {/* EMoji & Pic */}
            <div className="space-y-3 items-center inline-block p-1">
                <img src={Src} alt="DP" className="rounded-full object-cover h-8 w-8"/>
                
            </div>
            {/* Name and Comment*/}
            <div className="flex items-center m-1 bg-transparent w-5/6">  
               <div className="bg-gray-100 border  border-white p-3 rounded-2xl max-w-3/4">
                    <p> {Name} </p>
                <div className= "font-normal text-sm break-words">{Review}</div>
                </div>
                <div className="bg-gray-100 rounded-full flex justify-center cursor-pointer h-7 w-7 items-center hover:bg-cyan-400 group m-3">
                    <FontAwesomeIcon icon={faPrayingHands} className="text-gray-400 group-hover:text-white" />
                </div>
            </div>
                
        </div>
           
           
     
    )
}

export default ReviewBubble;
