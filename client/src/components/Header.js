import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const Header = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/')
    };

    return (
        <>
            <nav className="navHeader">
                <div>
                    <span className="brand-logo">IT Школа</span>
                    <ul className="right">
                        <li><a className="headerNavLink" href="/main">Главная страница
                            <svg className="toHomeIcon"/>
                        </a></li>
                        <li><a className="headerNavLink" href="/select_view">Расписание
                            <svg className="toViewIcon"/>
                        </a></li>
                        <li><a className="headerNavLink" href="/" onClick={logoutHandler}>Выйти
                            <svg className="toExitIcon"/>
                        </a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
};
