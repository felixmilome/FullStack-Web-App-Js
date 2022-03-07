import LeftbarRow from './LeftbarRow';
import {useSelector} from 'react-redux';
import {BeatLoader} from "react-spinners";
import {Link} from 'react-router-dom';


function Leftbar(){

    const hallFame = useSelector((state) => state.hallFameReducer);
    console.log(hallFame); 
    
    
return (
    <div className="invisible xl:visible p-4 my-1 w-1/4 m-x-4 bg-transparent  z-30 fixed left-0 top-10 h-screen  overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">
            {/* space */}
        <div className= "h-16">
            <p></p>
        </div>
            {/* Heading */}
            <div className="bg-transparent border-b  fixed top-16 left-0 my-2 p-3 cursor-pointer  w-1/4 flex justify-center">
                <p className= "text-sm"># Hall of Fame Ranking</p>
                
            </div> 

            {/* Hall OF FAME */}
            <div className="mb-60">
                { !hallFame.length ?
                    <div className="p-3 flex">   
                      <div className="text-center text-sm text-gray-400 p-3 m-auto bg-transparent rounded-xl">
                          
                          <BeatLoader size={15} color='cyan' loading/>
                          <p className= 'text-xs'>Preparing Hall Of Fame Ranks...</p>
                          
                      </div>
                  </div>  
                  :
                 
                    <>
                    { hallFame.map((rank) =>(
                        <Link to={'/Portfolios/' + rank.userName} key={rank._id}>
                             <LeftbarRow Src = {rank.dpUrl} title ={(hallFame.indexOf(rank)+1)} PersonName= {rank.userName} Points= {rank.activityPointsTotal}/>
                        </Link>
                        ))
                    } 
                    </>
               
        }
            </div>
    </div>
</div>
);
}
export default Leftbar;