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
import {Wallet} from '../components/Body/Wallet.jsx'
import{SecureVerify} from '../components/Body/SecureVerify.jsx'
import{ForgotPassword} from '../components/Body/ForgotPassword.jsx'





function Home({showProfile}) {

     const[popContacts, setpopContacts] = useState(false);

    const dispatch = useDispatch();


    // const agent = navigator.userAgent;

    // console.log(agent)
 

    useEffect(() => {
        dispatch(getHallFameAction());
      }, [dispatch]);

    const [diaryId, setDiaryId]= useState(null);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        //<div className="m-0 text-gray-700 h-full min-h-screen pb-40 bg-gradient-to-r from-teal-900 to-gray-900">
        <div className=" text-gray-700 h-full min-h-screen pb-40 bg-gray-300"> 

       
    
            
                <Header setpopContacts= {setpopContacts} popContacts={popContacts}/>  
                <Leftbar/>  
             
               
           
                    <Routes>
                        <Route exact path ="/securityChange/:change/:userId/:uniqueStr" element = {<SecureVerify/>}/> 
                         
                        <Route exact path ="/Portfolios/:profileName" element = {<Portfolios diaryId={diaryId} setDiaryId = {setDiaryId} setpopContacts={setpopContacts} popContacts={popContacts} />}/>
                         
                        <Route exact path ="/ForgotPassword" element = {<ForgotPassword/>}/>                 
                        <Route exact path ="*" element ={<NoPage/>}/>
                        {user &&
                        <>
                        <Route exact path ="/" element ={<Feed diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                        <Route exact path ="/DiaryLink/:diaryId" element = {<DiaryLink setDiaryId = {setDiaryId}/>}/> 
                        <Route exact path ="/PostForm" element ={<PostForm />}/>
                        <Route exact path ="/Settings" element = {<Settings/>}/>
                        <Route exact path ="/Wallet" element = {<Wallet/>}/>
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
                                backgroundImage: "url(" + "./assets/images/zooruraBGquad.jpg" + ")", 
                                backgroundPosition: 'center',
                                    //backgroundSize: 'cover',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'repeat',
                                    pointerEvents: 'none',
                                    opacity: 0.04,
                                }}
                className=" fixed top-0 z-20  w-screen h-screen ">  
                    
            </div>
           

        </div>
    )
}

export default Home;
