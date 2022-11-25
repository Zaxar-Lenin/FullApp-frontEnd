import React, {useEffect} from 'react';
import cl from './Header.module.scss'
import {Routers} from "routers/Routers";
import LinkС from "components/link/Link";
import {authStore} from "app/store/authStore";
import {observer} from "mobx-react-lite";

const Header = () => {
    const {isAuth, currentUser, logOut} = authStore


    switch (isAuth) {
        case (true): {
            console.log(currentUser)
            return <header className={cl.header}>
                <div>User: {currentUser.name}</div>
                <div onClick={() => {
                    logOut()
                }
                }>Выйти
                </div>
            </header>
        }
        case (false): {
            return <header className={cl.header}>
                <div>Itransition</div>
                <div className={cl.boxRight}>
                    <div><LinkС path={Routers.Login}>Войти</LinkС></div>
                    <div><LinkС path={Routers.Registration}>Регистрация</LinkС></div>
                </div>
            </header>
        }
    }

};

export default observer(Header);