


export const PostTagRow = ({tag}) => {

    return (
                
                    
                    <div className="flex justify-center text-center items-center space-x-2 ">

                        <img src= {tag.dpUrl} 
                        className= "inline-flex w-10 h-10 bg-white  object-cover rounded-full "/>
                        
                        <p className= " text-center text-sm text-gray-800 font-semibold">
                        @{tag.userName}</p>

                    </div>
                
  
               
            )
            
}






