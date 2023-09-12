import * as Actions from "../actions/loginAction"
const initialState = {
    user: null
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.SET_USER: {
            const { name, email, role, id} = action?.payload
            if(action.payload.accessToken){
                localStorage.setItem("token",action.payload.accessToken)
            }
            return{
                ...state,
                user: {
                    id,
                    name,
                    email,
                    role
                }
            }
        }
        case Actions.LOGOUT_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default loginReducer