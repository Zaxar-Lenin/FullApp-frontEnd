import React, {useEffect} from 'react';
import cl from "components/login/Login.module.scss";
import Box from "components/box/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {authStore} from "app/store/authStore";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Routers} from "routers/Routers";

type IFormInput = {
    name: string;
    email: string;
    password: string;
}

const Registration = () => {
    const {registration,isAuth} = authStore
    const navigate = useNavigate()
    const {handleSubmit, control,} = useForm<IFormInput>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        registration(data);
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
                    <h3>Регистрация</h3>
                    <Controller
                        control={control}
                        name="name"
                        render={({
                                     field
                                 }) => (
                            <TextField {...field} id="outlined-basic" label="Name" variant="outlined"/>
                        )}
                    />
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

export default observer(Registration);