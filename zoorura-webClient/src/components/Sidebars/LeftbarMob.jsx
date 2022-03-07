import LeftbarmobRow from './LeftbarmobRow';
import {useSelector} from 'react-redux';
import {BeatLoader} from "react-spinners";
import {Link} from 'react-router-dom';


function LeftbarMob({setpopRankings}){


    const hallFame = useSelector((state) => state.hallFameReducer);
    console.log(hallFame); 
    // text
return (
    <div className="rounded-xl visible xs:invisible p-2 w-full m-x-4 bg-gray-200 border-r border-gray-300 z-30 fixed left-0 top-24 h-screen  overflow-y-auto overflow-x-hidden">
        <div className="overflow-scroll">
                <div className="ml-1 text-center text-sm p-1">
                    # Hall of Fame Ranks
                </div>
            {/* People */}
            <div className="mb-60 ">

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
                        <Link onClick={()=>setpopRankings(false)} to={'/Portfolios/' + rank.userName} key={rank._id}>
                             <LeftbarmobRow Src = {rank.dpUrl} title ={(hallFame.indexOf(rank)+1)} PersonName= {rank.userName} Points= {rank.activityPointsTotal}/>
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
export default LeftbarMob;