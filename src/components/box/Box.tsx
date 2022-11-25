import React, {FC} from 'react';
import cl from './Box.module.scss';

type Props ={
    children: React.ReactNode
}

const Box : FC<Props>= ({children}) => {
    return (
        <div className={cl.box}>
            {children}
        </div>
    );
};

export default Box;