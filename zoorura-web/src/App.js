import './index.css';
import Home from './pages/Home.jsx';
import {useDispatch} from  'react-redux';
import { useEffect } from 'react';
import {getDiariesAction} from './components/Midwares/rdx/actions/diariesAction.js'
function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDiariesAction());
  }, [dispatch]);
 

  return <Home/>

}

export default App;
