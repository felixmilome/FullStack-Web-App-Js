export const callsReducer = (calls = 'notCalling', action) => {
     
    switch(action.type) {
        case 'CALLING_SOMEONE':
            console.log('callReducer');
            return action.payload;
        case 'CALL_ENDED':
            return 'notCalling';        
        default:
            return calls; 
     }
     
 } 