import React, {useEffect} from 'react';
import Box from "components/box/Box";
import cl from './Login.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {authStore} from "app/store/authStore";
import {Navigate, useNavigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Routers} from "routers/Routers";

type IFormInput = {
    email: string;
    password: string;
}

const Login = () => {
    const {isAuth, login} = authStore
    const navigate = useNavigate()
    const {handleSubmit, control,} = useForm<IFormInput>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        login(data);
    };

    useEffect(() => {
        if (isAuth) {
            navigate(Routers.Users)
        }
    },[isAuth])

    return (
        <div className={cl.login}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>

                    <h3>Авторизация</h3>
                    <Controller
                        control={control}
                        name="email"
                        render={({
                                     field
                                 }) => (
                            <TextField {...field} id="outlined-basic" label="email" variant="outlined"/>
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({
                                     field
                                 }) => (
                            <TextField {...field} id="outlined-basic" label="password" variant="outlined"/>
                        )}
                    />
                    <Button variant="contained" type={'submit'}>Применить</Button>

                </Box>
            </form>
        </div>
    );
};

export default observer(Login);