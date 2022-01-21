import ContactMod from '../Modals/ContactMod.jsx'
function RightbarmobRow({Src, title, GuestName, Points, setpopChatBox}) {
    return (
      <>
   
        <div onClick= {(e)=> setpopChatBox(true)} > 
        <div className="Relative items-center space-x-2
         mt-0.5 p-2 text-gray-500 hover:bg-white
          rounded-l-full rounded-tr-full shadow-xl
           cursor-pointer  text-xs group">
            {Src && <img src= {Src} alt="dp" className= "inline-flex w-10 h-10 p-0.5 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>}
           <p className= "inline-flex font-bold">
               {title}</p>
            <p className= "inline-flex  font-light">
               {GuestName}</p> 
            <p className= "inline-flex font-bold  text-gray-500">
               {Points}</p>
        </div>
        </div>
        </>
       
    )
}

export default RightbarmobRow; 
