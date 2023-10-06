import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import {logOutTC, meTC} from "../features/login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {
    const dispatch=useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const initialised = useAppSelector<boolean>((state) => state.app.isInitialised)
    const isLoggedIn= useAppSelector((state)=>state.auth.isLoggedIn)
    useEffect(()=>{
        console.log("3")
        dispatch(meTC())
    },[])

    if(!initialised){

        return <div style={{position: "fixed", top: "30%", textAlign:"center", width: '100%'}}><CircularProgress /></div>
    }
    const logOutHandler = ()=>{
        dispatch(logOutTC())
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button onClick={logOutHandler} color="inherit">Log Out</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route  path = "/" element={ <TodolistsList/>}/>
                    <Route path ="/login" element = {<Login/>}/>

                </Routes>

            </Container>
        </div>
    )
}

export default App
