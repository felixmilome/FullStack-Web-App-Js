import ContactMod from '../Modals/ContactMod.jsx'; 
import{useSelector} from 'react-redux';
import { useState, useEffect } from 'react'; 



function RightbarmobRow({Src, guestId, title, GuestName, Points, setpopChatBox}) {
  const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const[checkData, setCheckData] = useState({checkedId: guestId, checkerId: user.result._id});
   const[online, setOnline] = useState(false);
   const socket = useSelector((state) => state.socketReducer);
  console.log(socket);
 
    useEffect(() => {
          socket.current.emit("checkUserOnline", {
           checkData
        });
      }, []);

      setInterval(function(){

           socket.current.emit("checkUserOnline", {
           checkData
        });
        
      }, 120000);

      useEffect(() => {
        socket.current.on("checkedUserOnline", checkDataResponse =>{
            console.log(checkDataResponse);
            console.log("User Online");

            if (checkDataResponse?.checkedId === guestId){
              setOnline(true);
            }

        })
    }, []);
      useEffect(() => {
        socket.current.on("checkedUserOffline", checkDataResponse =>{
            console.log(checkDataResponse);
            console.log("User Offline");

            if (checkDataResponse?.checkedId === guestId){
              setOnline(false);
            }

        })
    }, []);
   
    return (
      <>
   
        <div onClick= {(e)=> setpopChatBox(true)} > 
        <div className="flex items-center space-x-2
         mt-0.5 p-2 text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 
          rounded-l-full rounded-tr-full shadow-xl
           cursor-pointer  text-xs group">
            {Src && 
            <div className= "relative inline-flex w-10 h-10 p-0.5 rounded-full bg-white dark:bg-gray-900 group-hover:bg-gray-600 cursor-pointer object-cover">
                
                <img src= {Src} alt="dp" className=' rounded-full ' />
                 
                {online ===true && <div className= 'absolute top-0 right-0 w-3 h-3 justify-center text-white items-center p-1 rounded-full border-2 border-white bg-cyan-400'>
                  {/* dot */}
                </div>}

                 {online ===false && <div className= 'absolute top-0 right-0 w-3 h-3 justify-center text-white items-center p-1 rounded-full border-2 border-white dark:border-gray-800 bg-gray-400'>
                  {/* dot */}
                </div>}
            
             </div> }
               
               
            <p className= "inline-flex  font-light">
               {GuestName}</p> 
              {title > 0 && <div className= 'inline-flex w-5 h-5  justify-center text-white items-center p-1 rounded-full bg-yellow-500'>
                <p className= "font-bold">
                  {title}
                </p>
               </div>}
            {/* <p className= "inline-flex font-bold  text-gray-500">
               {Points}</p> */}
        </div>
        </div>
        </>
       
    )
}

export default RightbarmobRow; 
