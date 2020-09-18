import {GET_EMPS, ADD_EMPS,EMPS_LOADING} from '../actions/types'

const initialState = {
    emps: [],
    loading: false
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_EMPS:
            return{
                ...state,
                emps:action.payload,
                loading:false
            }
        case ADD_EMPS:
            return{
                ...state,
                emps:[action.payload,...state.emps]
            }
        case EMPS_LOADING:
            return{
                ...state,
                loading:true
            }
        default:
            return state
    }
}