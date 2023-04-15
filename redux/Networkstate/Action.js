import { NETWORK_DATA,NETWORK_STATE } from "./Type";

export const networkstatedata=(id)=>{
return{
    type:NETWORK_DATA,
    payload:id
}
}
export const networkstatedispatch=(id)=>{
return{
    type:NETWORK_STATE,
    payload:id
}
}