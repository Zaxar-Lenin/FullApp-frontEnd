import { CircularProgress } from '@mui/material';

import styles from './Payloader.module.scss';

const Payloader = () => (
    <div className={styles.wrapper}>
        <CircularProgress />
    </div>
);

export default Payloader;