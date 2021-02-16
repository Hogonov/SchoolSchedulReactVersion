import React, {useContext} from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const Header = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/login')
    };

    return (
        <>
            <nav className="navHeader">
                <div>
                    <ul className="left">
                        <div className="brand-logo">IT Школа</div>
                    </ul>
                    <ul className="right">
                        <li><Link className="headerNavLink" to="/main">Главная страница
                            <svg className="toHomeIcon"/>
                        </Link></li>
                        <li><Link className="headerNavLink" to="/view">Расписание
                            <svg className="toViewIcon"/>
                        </Link></li>
                        <li><Link className="headerNavLink" to="/" onClick={logoutHandler}>Выйти
                            <svg className="toExitIcon"/>
                        </Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
};
