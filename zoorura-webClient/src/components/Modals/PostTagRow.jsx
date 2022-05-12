


export const PostTagRow = ({tag}) => {

    return (
                 
                    
                    <div className="flex bg-gray-100 dark:bg-gray-900 m-0.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md p-0.5 justify-right text-center items-center space-x-2 ">

                        <img src= {tag.dpUrl} 
                        className= "inline-flex w-8 h-8 bg-white  object-cover rounded-full "/>
                        
                        <p className= " text-center text-xs  font-semibold">
                        @{tag.userName}</p>

                    </div>
                
  
               
            )
            
}






