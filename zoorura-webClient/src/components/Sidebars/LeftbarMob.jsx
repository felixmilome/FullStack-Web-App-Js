
import { BallersArena } from './BallersArena';


function LeftbarMob({setpopRankings}){

return (
    <div onClick={()=>setpopRankings(false)} className="rounded-xl visible xs:invisible p-2 w-full m-x-4 bg-gray-100 border-r border-gray-300 z-30 fixed left-0 top-32 h-screen  overflow-y-auto overflow-x-hidden">
       <BallersArena/>
</div>
);
}
export default LeftbarMob;