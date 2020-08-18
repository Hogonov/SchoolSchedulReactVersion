import React from "react";
import {Link} from "react-router-dom";

export const AdminOfficePage = () => {
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
                <Link to="/add_school">Добавление школы</Link>
            </div>
            <div>
                <Link to="/users">Пользователи</Link>
            </div>
            <div>
                <Link to="/add_data_admin">Добавление данных</Link>
            </div>
            <div>
                <Link to="/ad">Реклама</Link>
            </div>
        </div>
    )
};