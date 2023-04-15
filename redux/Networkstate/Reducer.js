
import { NETWORK_DATA,NETWORK_STATE} from "./Type";

const initialState={
    networkstatus:{},
    networkstate:true
}

const NetworkReducer=(state=initialState,action)=>{
switch (action.type) {
    case NETWORK_DATA:return{
        ...state,
        networkstatus:action.payload
    }
    case NETWORK_STATE:return{
        ...state,
        networkstate:action.payload
    }
        
       

    default:return state;
        
}
}
export default NetworkReducer;