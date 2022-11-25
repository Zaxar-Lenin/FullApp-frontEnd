export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    id: string,
    token: string,
    name: string,
    email: string,
    status: StatusType;
}
export type RegistrationRequest = {
    name: string;
    email: string;
    password: string;
}
export type RegistrationResponse = {
    message: string;
    dataUser: LoginRequest
}
export type UsersResponse = {
   user: UsersType[]
}

export type CurrentUserType = {
    id: string;
    name: string;
    email: string;
    status: StatusType
}

export type UsersType = {
    id: string;
    email:  string;
    name:  string;
    dataRegistration: string;
    dataLogin:  string;
    status: StatusType;
}

export type MessageUsersResponse = {
    message: string;
}

export type RequestUpdateUser = {
    status: StatusType;
    listId: string[];
}
export type RequestRemoveUser = {
    listId: string[];
}

export type StatusType = "unblock" | "block"