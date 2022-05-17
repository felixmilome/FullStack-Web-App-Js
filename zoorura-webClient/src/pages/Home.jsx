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
import { useEffect, useCallback } from 'react';
import {useDispatch, useSelector,} from 'react-redux';
import {DiaryLink} from '../components/Body/PostLinks/DiaryLink.jsx' 
import {Settings} from '../components/Body/Settings.jsx'
import {ChatHunt} from '../components/Body/ChatHunt.jsx'
import {Wallet} from '../components/Body/Wallet.jsx'
import{SecureVerify} from '../components/Body/SecureVerify.jsx'
import{ForgotPassword} from '../components/Body/ForgotPassword.jsx'
import { Follows } from "../components/Body/Follows.jsx";





function Home({showProfile}) {

    const[popContacts, setpopContacts] = useState(false);
    const [themer, setThemer] = useLocalStorage('themer', localStorage.getItem("themer"));
    const [theme, setTheme] = useState('dark-webServer');
  
    
    // const themer = useSelector((state) => state.themerReducer);



     //const[theme,setTheme] = useState('');

    const dispatch = useDispatch();

    function useLocalStorage(key, initialState) {
        const [themer, setThemer] = useState(localStorage.getItem(key) ?? initialState);
        const updatedSetValue = useCallback(
          newValue => {
            if (newValue === initialState || typeof newValue === 'undefined') {
              localStorage.removeItem(key);
            } else {
              localStorage.setItem(key, newValue);
            }
            setThemer(newValue ?? initialState);
          },
          [initialState, key]
        );
        return [themer, updatedSetValue];
      }

      console.log(themer);


      console.log(themer);
      console.log(theme);


    // const agent = navigator.userAgent;

    console.log(localStorage.themer);
 

    useEffect(() => {
        dispatch(getHallFameAction());
      }, [dispatch]);

    const [diaryId, setDiaryId]= useState(null);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const themeSetter =()=> {

        //if ((!('themer' in localStorage))
        if (themer === 'system'){

            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                setTheme('dark')
            }else{
                setTheme ('')
            }
        }else if (themer==='dark'){
            setTheme ('dark')
        }else if (themer==='light'){
            setTheme ('')
        }

    }

  
   
            //   //localStorage.themer === 'dark' || (!('themer' in localStorage) &&       //localstorage.createItem use this 
            //   window.matchMedia('(prefers-color-scheme: dark)').matches
            //   //)
            //   ) {
            //       //document.documentElement.classList.add('dark') //work on it later
            //       setMode(''); 
            //   } else {
            //       //document.documentElement.classList.remove('dark')
            //       setMode(null);
            //   } 
  

    useEffect(() => {
        themeSetter()
      }, [themer]);

    return (
        // ${themer === 'dark' ? 'bg-gradient-to-r from-cyan-900 to-gray-900': 'bg-gray-300'}
        //<div className="m-0 text-gray-700 h-full min-h-screen pb-40 bg-gradient-to-r from-teal-900 to-gray-900">
        <div className={`${theme}`}>
                <div className={`text-gray-800 dark:text-gray-200 h-full min-h-screen pb-40  ${theme === 'dark' ? 'bg-black': 'bg-gray-300'} 

                

                 `}> 

            
            
                    
                        <Header themer={themer} setThemer={setThemer}/>  
                        <Leftbar/>  
                    
                    
                
                            <Routes>
                                <Route exact path ="/securityChange/:change/:userId/:uniqueStr" element = {<SecureVerify/>}/> 
                                
                            
                                <Route exact path ="/ForgotPassword" element = {<ForgotPassword/>}/>                 
                                <Route exact path ="*" element ={<NoPage/>}/>
                                {user && 
                                <>
                                <Route exact path ="/" element ={<Feed diaryId={diaryId} setDiaryId = {setDiaryId} />}/>
                               { user.result.verified ===true &&
                                    <>
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
