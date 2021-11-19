import Header from "../components/Headers/Header.jsx";
import Footer from "../components/Sidebars/Footer.jsx";
import Feed from "../components/Body/Feed.jsx";
import Leftbar from "../components/Sidebars/Leftbar.jsx";
import Rightbar from "../components/Sidebars/Rightbar.jsx";
import {Routes, Route} from 'react-router-dom';
import PostForm from "../components/Body/PostForm.jsx";


function Home({showProfile}) {
    return (
        <div className="bg-gray-200 h-full min-h-screen pb-40">
           
                <Header/> 
                <Leftbar/> 
                    <Routes>
                        <Route exact path ="/" element ={<Feed/>}/>
                        <Route exact path ="/PostForm" element ={<PostForm/>}/>
                    </Routes> 
                <Rightbar/>             
                <Footer/>
                
           

        </div>
    )
}

export default Home;
