export const convoStateReducer = (convoState = 'SearchingConvo', action) => {
     
    switch(action.type) {

        case 'NO_CONVO':
            console.log('noConvo')
            return 'NoConvo';

        case 'YES_CONVO':
              
            return 'YesConvo';

        case 'SEARCHING_CONVO':
  
            return 'SearchingConvo';
          

        default:
            return convoState;
     }
      
 }