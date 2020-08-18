import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/auth.hook";
import {Loader} from "../components/Loader";
import {useHttp} from "../hooks/http.hook";


export const MainPage = () => {
    const {loading, request, error, clearError} = useHttp();
    const {userRole, userId, login} = useAuth();

    if (loading) {
        return <div>
            <Loader/>
        </div>
    } else if (userRole === 'ROLE_ADMIN'){
        return (
            <div>
                <h1/>
                <div>
                    <Link to="/editor">Редактор</Link>
                </div>
                <div>
                    <Link to="/announcement">Объявления</Link>
                </div>
                <div>
                    <Link to="/users">Пользователи</Link>
                </div>
                <div>
                    <Link to="/add_data">Добавление данных</Link>
                </div>
                <div>
                    <Link to="/add_time">Добавить время</Link>
                </div>
                <div>
                    <Link to="/dir">Добавить директора</Link>
                </div>
                <div>
                    <Link to="/ad">Реклама</Link>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <h1/>
                <div>
                    <Link to="/editor">Редактор</Link>
                </div>
                <div>
                    <Link to="/announcement">Объявления</Link>
                </div>
                <div>
                    <Link to="/add_data">Добавление данных</Link>
                </div>
                <div>
                    <Link to="/add_time">Добавить время</Link>
                </div>
                <div>
                    <Link to="/dir">Добавить директора</Link>
                </div>
            </div>
        )
    }
};