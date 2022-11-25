import React, {FC, useEffect, useState} from 'react';
import cl from './Users.module.scss'
import {observer} from "mobx-react-lite";
import {authStore} from "app/store/authStore";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import Button from '@mui/material/Button';
import {StatusType} from "app/api/types";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 270},
    {field: 'name', headerName: 'Имя', width: 100},
    {field: 'email', headerName: 'мыло', width: 130},
    {field: 'dataRegistration', headerName: 'Дата регистрации', width: 150},
    {field: 'dataLogin', headerName: 'Дата авторизации', width: 150},
    {field: 'status', headerName: 'статус', width: 130},

];

type Props = {
    listId: string[]
}


const Bar: FC<Props> = observer(({listId}) => {
    const {updateUser, removeUser} = authStore

    const handleFunction = (status: StatusType) => {
        updateUser({status, listId})
    }

    return <div>
        <Button variant="contained" onClick={() => {
            handleFunction("unblock")
        }}>Unblock</Button>
        <Button variant="contained" onClick={() => {
            handleFunction("block")
        }}><BlockIcon/></Button>
        <Button variant="contained" onClick={() => {
            removeUser({listId})
        }}><DeleteIcon/></Button>
    </div>
})


const Users = () => {
    const {isAuth, getUsers, users} = authStore

    const navigate = useNavigate()

    const [listId, setListId] = useState<any>([])

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }

        getUsers()
    }, [isAuth])

    useEffect(() => {

    }, [users])

    console.log(users[0])

    return (
        <div className={cl.users}>
            <div className={cl.tabl}>
                <DataGrid
                    components={{
                        Toolbar: Bar
                    }}
                    componentsProps={{
                        toolbar: {listId}
                    }}
                    onSelectionModelChange={itm => setListId(itm)}
                    rows={users}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default observer(Users);