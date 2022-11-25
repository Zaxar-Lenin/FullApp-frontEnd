
import { makeAutoObservable } from 'mobx';
import {Nullable} from "components/snakBar/SnakBars";

class AppStore {

    errorMessage: Nullable<string> = null;

    successMessage: Nullable<string> = null;


    constructor() {
        makeAutoObservable(this);
    }

    setErrorMessage = (message: Nullable<string>) => {
        this.errorMessage = message;
    };

    setSuccessMessage = (message: Nullable<string>) => {
        this.successMessage = message;
    };
}

export const appStore = new AppStore();
