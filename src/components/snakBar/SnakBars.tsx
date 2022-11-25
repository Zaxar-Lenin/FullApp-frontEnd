import {ReactElement} from 'react';

import {observer} from 'mobx-react-lite';

import {appStore} from "app/store/appStore";
import {AlertSnackbar} from "components/snakBar/SnakBar";

const AlertSnackbars = observer((): Nullable<ReactElement> => {
    const { setSuccessMessage, successMessage, errorMessage, setErrorMessage } = appStore;

    if (errorMessage !== null) {
        return <AlertSnackbar type="error" onClose={setErrorMessage} message={errorMessage} />;
    }

    if (successMessage !== null) {
        return <AlertSnackbar type="success" onClose={setSuccessMessage} message={successMessage} />;
    }

    return null;
});

export default AlertSnackbars;

export type Nullable<T> = null | T;
