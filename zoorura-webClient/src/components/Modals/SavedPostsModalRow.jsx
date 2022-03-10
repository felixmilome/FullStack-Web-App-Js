import{MdOutlineCancel} from 'react-icons/md';

function SavedPostsModalRow ({Src, title, PersonName, Note, Time, savedId}) {
    return (
        <div className= "relative w-full items-center text-gray-500 hover:bg-white rounded-md shadow-md cursor-pointer group p-1">
           
                    <div className="flex text-xs sm:text-sm bg-transparent items-center space-x-2 mt-2  ">
                        {Src && <img src= {Src} alt="dp" className= "inline-flex w-10 h-10 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>}
                    <div style={{wordBreak: 'break-word'}} className="space-x-1 ">
                        <p className= "inline-flex font-bold">
                        {title}</p>
                        <p className= "inline-flex font-light">
                        @{PersonName}</p> 
                        <p className= "sm:inline-flex font-bold text-gray-500">
                        {Time}</p>
                        <p  className= "sm:text-left font-semibold text-gray-400">
                        {Note}</p>
                        </div>
                    </div>

        </div>
       
    )
}

export default SavedPostsModalRow; 
