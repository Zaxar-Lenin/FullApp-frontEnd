import React, {FC} from 'react';
import {Link} from "react-router-dom";
import cl from './Link.module.scss'

type Props = {
    children: React.ReactNode;
    path: string;
}

const LinkС: FC<Props> = ({children, path}) => {
    return (
        <Link className={cl.link} to={path}>
            {children}
        </Link>
    );
};

export default LinkС;