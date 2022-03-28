import LeftbarRow from './LeftbarRow';
import {useSelector} from 'react-redux';
import {BeatLoader} from "react-spinners";
import {Link} from 'react-router-dom';
import{GiArena, GiSuitcase} from 'react-icons/gi';
import{RiVipCrownFill} from 'react-icons/ri';

export const BallersArena = () => {
    const hallFame = useSelector((state) => state.hallFameReducer);
    console.log(hallFame); 
  return (
    <>
         <div className="overflow-scroll">
            {/* space */}
    
            {/* Heading */}
            <div className="bg-transparent  my-2 p-3 cursor-pointer  items-center flex  space-x-2 justify-center">
                
                   <div className="w-8 h-8 bg-gray-700 text-gray-100 flex justify-center items-center rounded-full">
                    <RiVipCrownFill/>
                     </div>
                
                <p className= "font-bold text-sm">Ballers Arena</p>
                
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
    </>
  )
}

