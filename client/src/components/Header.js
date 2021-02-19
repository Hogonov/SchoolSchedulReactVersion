import React, {useContext, useEffect} from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'


export const Header = props => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        props.setFlag({...props.flag, isLogin: true, isView: false})
        document.getElementById('routerDiv').className = 'container'
        event.preventDefault();
        auth.logout();
        history.push('/login')
    };

    return (
        <>
            {props.flag &&
            <nav className="navHeader">
                <div>
                    <ul className="left">
                        <div className="brand-logo">IT Школа</div>
                    </ul>
                    <ul className="right">
                        {
                            props.isAuthenticated && <>
                                <li><Link className="headerNavLink" to="/main">Главная страница
                                    <svg className="toHomeIcon"/>
                                </Link></li>
                                <li><Link className="headerNavLink" to="/view">Расписание
                                    <svg className="toViewIcon"/>
                                </Link></li>
                            </>
                        }
                        <li><Link className="headerNavLink" to="/" onClick={logoutHandler}>{props.isAuthenticated ? 'Выйти' : 'Войти'}
                            <svg className="toExitIcon"/>
                        </Link></li>
                    </ul>
                </div>
            </nav>
            }
        </>
    )
};
