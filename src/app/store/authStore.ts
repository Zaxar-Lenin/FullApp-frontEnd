import {makeAutoObservable, runInAction} from "mobx";
import {AuthService} from "app/api/authService";
import {
    CurrentUserType,
    LoginRequest,
    RegistrationRequest,
    RequestRemoveUser,
    RequestUpdateUser,
    UsersType
} from "app/api/types";
import {appStore} from "app/store/appStore";

class AuthStore {
    isAuth = false;

    isLoading = false;

    currentUser = {} as CurrentUserType;

    users = [] as UsersType[];

    constructor() {
        makeAutoObservable(this)
    }

    login = async (params: LoginRequest) => {
        this.isLoading = false
        try {
            const res = await AuthService.login(params)
            if(res.data.status === "block"){
                appStore.setErrorMessage("Вы заблокированы");
                this.isLoading = true
                return
            }
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            runInAction((() => {
                this.currentUser = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    status: res.data.status,
                }
                this.isAuth = true
            }))
            this.isLoading = true
        } catch (e) {
            console.log(e)
            appStore.setErrorMessage("Неправильный email или password");
            this.isLoading = true
        }
    }

    registration = async (params: RegistrationRequest) => {
        this.isLoading = false
        try {
            const res = await AuthService.registration(params)
            if (res.status === 200) {
                await this.login(res.data.dataUser)
            }
            this.isLoading = true
        } catch (e) {
            console.log(e)
            appStore.setErrorMessage("ЧТО-то пошло не так");
            this.isLoading = true
        }
    }

    auth = async () => {
        this.isLoading = false
        try {
            const res = await AuthService.auth()
            runInAction((() => {
                this.currentUser = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    status: res.data.status,
                }
                this.isAuth = true
                this.isLoading = true
                appStore.setSuccessMessage('Успешный вход.');
            }))

        } catch (e) {
            console.log(e)
            appStore.setErrorMessage('Не авторизован');
            this.isAuth = false
            this.isLoading = true
            localStorage.removeItem("token")
        }
    }

    getUsers = async () => {
        try {
            const res = await AuthService.users()
            runInAction((() => {
                this.users = res.data.user
                res.data.user.forEach(user => {
                    if(user.id === this.currentUser.id && user.status === "block"){
                        this.logOut()
                    }
                })
            }))

        } catch (e) {
            console.log(e)
        }
    }

    updateUser = async (params: RequestUpdateUser) => {
        try {
            const res = await AuthService.updateUser(params)
            if (res.status === 200) {
                this.getUsers()
                appStore.setSuccessMessage(`Пользователь ${params.status}`);
            }
        } catch (e) {
            console.log(e)
        }
    }

    removeUser = async (params: RequestRemoveUser) => {
        try {
            const res = await AuthService.removeUser(params)
            const removeId = params.listId.find(f => f === this.currentUser.id)
            if(this.currentUser.id === removeId){
                this.logOut()
                appStore.setErrorMessage("Вы удалены");
                this.isLoading = true
                return
            }
            if (res.status === 200) {
                this.getUsers()
                appStore.setSuccessMessage('Успешно удален');
            }
        } catch (e) {
            console.log(e)

        }
    }

    logOut = () => {
        this.isLoading = false
        this.currentUser = {} as CurrentUserType
        this.isAuth = false
        localStorage.removeItem("token")
        this.isLoading = true
    }
}


export const authStore = new AuthStore()


