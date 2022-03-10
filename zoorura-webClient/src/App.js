import './index.css';
import Home from './pages/Home.jsx';
import {useDispatch} from  'react-redux';
import { useEffect, useState } from 'react';
import {getDiariesAction} from './components/Midwares/rdx/actions/diariesAction.js'
function App() {
const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user){
    dispatch(getDiariesAction());
    }
  }, [dispatch]);
 

  return <Home/>

}

export default App;
