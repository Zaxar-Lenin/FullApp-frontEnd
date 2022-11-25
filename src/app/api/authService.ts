import {instance} from "app/api/instance";
import {
    LoginRequest,
    LoginResponse,
    MessageUsersResponse,
    RegistrationRequest,
    RegistrationResponse,
    RequestRemoveUser,
    RequestUpdateUser,
    UsersResponse
} from "app/api/types";
import {Routers} from "routers/Routers";


export const AuthService = {
    login: (params: LoginRequest) => {
        return instance.post<LoginResponse>(`/api/auth${Routers.Login}`, params)
    },
    registration: (params: RegistrationRequest) => {
        return instance.post<RegistrationResponse>(`/api/auth${Routers.Registration}`, params)
    },
    auth: () => {
        return instance.get<LoginResponse>(`/api/auth${Routers.Auth}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        },)
    },
    users: () => {
        return instance.get<UsersResponse>(`/api/auth${Routers.GetUsers}`)
    },
    updateUser: (params: RequestUpdateUser) => {
        return instance.put<MessageUsersResponse>(`/api/auth${Routers.GetUsers}`, params)
    },
    removeUser: ({listId}: RequestRemoveUser) => {
        return instance.delete<MessageUsersResponse>(`/api/auth${Routers.GetUsers}/${listId}`)
    },
}