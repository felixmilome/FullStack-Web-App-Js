import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

//RDX
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './components/Midwares/rdx/reducers/index.js';
//import {img} from './components/img/'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
      <div className="relative">
      {/* <div 
        style={{  
                           // backgroundImage: "url(" + "https://thumbs.dreamstime.com/z/cartoon-cute-doodles-hand-drawn-african-illustration-sketchy-picture-doodle-inscription-africa-74329506.jpg" + ")",
                           backgroundImage: "url(" + "./assets/images/zooruraBGClean.jpg" + ")", 
                           backgroundPosition: 'center',
                            //backgroundSize: 'cover',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'repeat',
                            pointerEvents: 'none',
                            opacity: 0.05,
                        }}
          className=" fixed top-0 z-10 bg-transparent w-screen h-screen"> 
        
          </div> */}
              
            <App/>
      </div>
    </Provider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('mzizi')
);


