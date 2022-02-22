import {BeatLoader} from "react-spinners";
export const SurePop = ({action, token, message, loadingFunction, loadingMessage, yesFunction, noFunction}) =>{

    return(
        <div className='fixed h-screen opacity-90  w-screen top-0 left-0 z-40 bg-gray-500 w-full h-screen'>
            <div className= "bg-gray-100 items-center m-auto w-5/6 sm:w-1/4 mt-80 rounded-xl p-8 text-center border border-gray-300">
                                
                    <p> {action} {token && <span className="font-bold">{token}</span>} {message}</p>
                    <div className="flex justify-around items-center pt-4 m-auto">

                    { loadingFunction === true &&
                    
                            <div className= "flex items-center bg-green-300 text-white p-2 rounded-md cursor-pointer">
                                {loadingMessage}
                                <BeatLoader size={7} color='white' loading/>
                            </div>

                        }

                        { loadingFunction === false &&
                            <>
                                <div onClick = {yesFunction} className= "bg-green-400 text-white p-2 rounded-md cursor-pointer hover:bg-green-500">
                                    Yes
                                </div>
                            
                                <div onClick = {noFunction} className= "bg-gray-400 text-white p-2 rounded-md cursor-pointer hover:bg-gray-500">
                                    No
                                </div> 
                            </>
                        
                        }
                    </div>
                </div>  

            </div>
    )
}