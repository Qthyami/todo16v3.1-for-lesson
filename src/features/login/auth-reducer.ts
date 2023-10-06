import { Dispatch } from 'redux'
import {
    SetAppErrorActionType, setAppInitialisedAC,
    setAppStatusAC,
    SetAppStatusActionType,
    SetInitialisedActionType
} from '../../app/app-reducer'
import {authAPI, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions


// thunks
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.login(data)
        if (res.data.resultCode===0){
            dispatch((setIsLoggedInAC(true)))
            dispatch (setAppStatusAC("succeeded"))
        } else{
            handleServerAppError(res.data,dispatch)
        }
    } catch (e){
        handleServerNetworkError((e) as {message:string}, dispatch)
    }
}
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.me()
        if (res.data.resultCode===0){
            dispatch((setIsLoggedInAC(true)))
            dispatch (setAppStatusAC("succeeded"))
        } else{
            handleServerAppError(res.data,dispatch)
        }
    } catch (e){
        handleServerNetworkError((e) as {message:string}, dispatch)
    }
    finally {
        dispatch(setAppInitialisedAC(true))
    }
}
export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        }
        )
        .finally(()=>{
            dispatch(setAppInitialisedAC(true))
            }


        )


}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType | SetInitialisedActionType