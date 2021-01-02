import React,{useReducer, createContext} from "react"
import jwtDecode from "jwt-decode"


const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else{
        initialState.user = decodedToken 
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData)=> {},
    logout: ()=>{}
})

function authReducer(state, action){
    switch(action.type){
        default:
            return state

        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData)=>{
        localStorage.setItem('jwtToken', userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
        alert('Logged in successfully')
    }
    const logout = ()=>{
        localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT',
        })
        alert('Logged out successfully')
    }

    return (
        <AuthContext.Provider 
            value={{ user: state.user, login, logout }}
            { ...props }
        />
    )
}

export  {AuthContext, AuthProvider}
