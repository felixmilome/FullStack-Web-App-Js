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
import {DiaryLink} from '../components/Body/PostLinks/DiaryLink.jsx'
import {Settings} from '../components/Body/Settings.jsx'
import{SecureVerify} from '../components/Body/SecureVerify.jsx'



function Home({showProfile}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHallFameAction());
      }, [dispatch]);

    const [diaryId, setDiaryId]= useState(null);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        <div className="bg-transparent h-full min-h-screen pb-40">

       
    
            
                <Header/> 
                <Leftbar/>  
             
               
           
                    <Routes>
                        <Route exact path ="/securityChange/:userId/:uniqueStr" element = {<SecureVerify/>}/> 
                        <Route exact path ="/" element ={<Feed diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        <Route exact path ="/Portfolios/:profileName" element = {<Portfolios diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        <Route exact path ="/DiaryLink/:diaryId" element = {<DiaryLink/>}/>                   
                        <Route exact path ="*" element ={<NoPage/>}/>
                        {user &&
                        <>
                        <Route exact path ="/PostForm" element ={<PostForm />}/>
                        <Route exact path ="/Settings" element = {<Settings/>}/>
                        <Route exact path ="/PostEdit" element ={<PostEdit diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        </>
                        }
                       
                    </Routes> 

                
                {user &&
                <>
                <Rightbar/>             
                {/* <Footer/> */}
                </>
                }
            
            <div 
                        
                        style={{  
                                // backgroundImage: "url(" + "https://thumbs.dreamstime.com/z/cartoon-cute-doodles-hand-drawn-african-illustration-sketchy-picture-doodle-inscription-africa-74329506.jpg" + ")",
                                backgroundImage: "url(" + "./assets/images/zooruraBGClean.jpg" + ")", 
                                backgroundPosition: 'center',
                                    //backgroundSize: 'cover',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'repeat',
                                    pointerEvents: 'none',
                                    opacity: 0.02,
                                }}
                className=" fixed top-0 z-50  w-screen h-screen">  
                    
            </div>
           

        </div>
    )
}

export default Home;
