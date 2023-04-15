
import { USER_DATA,} from "./Type";

const initialState={
    userdata:{},
   
 
}

const CommanReducer=(state=initialState,action)=>{
switch (action.type) {
    case USER_DATA:return{
        ...state,
        bottomtabstate:action.payload
    }
   
       

    default:return state;
        
}
}
export default CommanReducer;