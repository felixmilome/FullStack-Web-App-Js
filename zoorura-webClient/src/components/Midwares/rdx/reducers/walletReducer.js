export const walletReducer = (wallet = 0, action) => {
     
    switch(action.type) {

        case 'GET_WALLET':
             return action.payload; 
        default: 
             return wallet;    
     }
     
 }