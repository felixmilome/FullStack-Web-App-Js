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
import {ChatHunt} from '../components/Body/ChatHunt.jsx'
import {Wallet} from '../components/Body/Wallet.jsx'
import{SecureVerify} from '../components/Body/SecureVerify.jsx'
import{ForgotPassword} from '../components/Body/ForgotPassword.jsx'
import { Follows } from "../components/Body/Follows.jsx";





function Home({showProfile}) {

     const[popContacts, setpopContacts] = useState(false);
     const[mode, setMode] = useState(null);

    const dispatch = useDispatch();


    // const agent = navigator.userAgent;

    // console.log(agent)
 

    useEffect(() => {
        dispatch(getHallFameAction());
      }, [dispatch]);

    const [diaryId, setDiaryId]= useState(null);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
    const modeSetter =()=> {
        if (
            //localStorage.theme === 'dark' || (!('theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: dark)').matches
        //)
        ) {
            //document.documentElement.classList.add('dark') //work on it later
            setMode('dark');
        } else {
            //document.documentElement.classList.remove('dark')
            setMode(null);
        }
    }
    console.log(localStorage.theme);

    useEffect(() => {
        modeSetter()
      }, [dispatch]);

    return (
        // ${mode === 'dark' ? 'bg-gradient-to-r from-cyan-900 to-gray-900': 'bg-gray-300'}
        //<div className="m-0 text-gray-700 h-full min-h-screen pb-40 bg-gradient-to-r from-teal-900 to-gray-900">
        <div className={`${mode}`}>
                <div className={`text-gray-800 dark:text-gray-200 h-full min-h-screen pb-40 bg-gray-300 dark:bg-gray-900 

                

                 `}> 

            
            
                    
                        <Header setpopContacts= {setpopContacts} popContacts={popContacts}/>  
                        <Leftbar/>  
                    
                    
                
                            <Routes>
                                <Route exact path ="/securityChange/:change/:userId/:uniqueStr" element = {<SecureVerify/>}/> 
                                
                            
                                <Route exact path ="/ForgotPassword" element = {<ForgotPassword/>}/>                 
                                <Route exact path ="*" element ={<NoPage/>}/>
                                {user &&
                                <>
                                <Route exact path ="/" element ={<Feed diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                                <Route exact path ="/Portfolios/:profileName" element = {<Portfolios diaryId={diaryId} setDiaryId = {setDiaryId} setpopContacts={setpopContacts} popContacts={popContacts} />}/>
                                <Route exact path ="/Portfolios/:profileName/:getItem" element = {<Follows setpopContacts={setpopContacts} popContacts={popContacts} />}/>
                                <Route exact path ="/DiaryLink/:diaryId" element = {<DiaryLink setDiaryId = {setDiaryId}/>}/> 
                                <Route exact path ="/Portfolios/:diaryId" element = {<DiaryLink setDiaryId = {setDiaryId}/>}/>
                                <Route exact path ="/PostForm" element ={<PostForm />}/>
                                <Route exact path ="/Settings" element = {<Settings/>}/>
                                <Route exact path ="/ChatHunt" element = {<ChatHunt setpopContacts={setpopContacts} />}/>
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
                                            opacity: 0.03,
                                        }}
                        className=" fixed top-0 z-20  w-screen h-screen ">  
                            
                    </div>
                

                </div>
        </div>
    )
}

export default Home;
