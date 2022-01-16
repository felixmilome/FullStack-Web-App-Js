import Header from "../components/Headers/Header.jsx";
import Footer from "../components/Sidebars/Footer.jsx";
import Feed from "../components/Body/Feed.jsx";
import Leftbar from "../components/Sidebars/Leftbar.jsx";
import Rightbar from "../components/Sidebars/Rightbar.jsx";
import {Routes, Route} from 'react-router-dom';
import PostForm from "../components/Body/PostForm.jsx";
import PostEdit from "../components/Body/PostEdit.jsx";
import Portfolios from "../components/Body/Portfolios.jsx";
import {NoPage} from "../components/Body/NoPage.jsx";
import {useState} from 'react'; 
import {getHallFameAction} from '../components/Midwares/rdx/actions/hallFameAction.js'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';



function Home({showProfile}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHallFameAction());
      }, [dispatch]);

    const [diaryId, setDiaryId]= useState(null);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        <div className="bg-gray-200 h-full min-h-screen pb-40">
           
    
            
                <Header/> 
                <Leftbar/>  
             
               
           
                    <Routes>
                        <Route exact path ="/" element ={<Feed diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        <Route exact path ="/Portfolios/:profileName" element = {<Portfolios diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        <Route exact path ="*" element ={<NoPage diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        {user &&
                        <>
                        <Route exact path ="/PostForm" element ={<PostForm />}/>
                        <Route exact path ="/PostEdit" element ={<PostEdit diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        </>
                        }
                       
                    </Routes> 

                
                {user &&
                <>
                <Rightbar/>             
                <Footer/>
                </>
                }
           
           

        </div>
    )
}

export default Home;
