import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Routers} from "routers/Routers";
import Header from "components/header/Header";
import Login from "components/login/Login";
import Registration from "components/registration/Registration";
import Users from "components/users/Users";
import {authStore} from "app/store/authStore";
import {observer} from "mobx-react-lite";
import AlertSnackbars from "components/snakBar/SnakBars";
import Payloader from "components/payloader/Payloader";

function App() {
    const {auth, logOut, isLoading, currentUser} = authStore

    const navigate = useNavigate()

    useEffect(() => {
        auth()
        if (currentUser.status === "block") {
            logOut()
            navigate(Routers.Login)
        }
    }, [])

    if (!isLoading) {
        return <Payloader/>
    }

    return (

        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/'} element ={<Navigate to = {Routers.Login} />}/>
                <Route path={Routers.Login} element={<Login/>}/>
                <Route path={Routers.Registration} element={<Registration/>}/>
                <Route path={Routers.Users} element={<Users/>}/>
            </Routes>
            <AlertSnackbars/>
        </div>
    );
}

export default observer(App);
