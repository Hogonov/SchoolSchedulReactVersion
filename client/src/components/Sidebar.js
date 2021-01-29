import React, {useContext} from 'react'
import {Nav} from "react-bootstrap";
import {useAuth} from "../hooks/auth.hook";
import {Link} from "react-router-dom";


export const Sidebar = (props) => {

    return (
        <>
            <Nav className="sidebar">
                <Nav.Item>
                    <Link className="nav-link" to="/editor">Редактор
                        <svg className="toArrowIcon"/>
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/editor_special_course">Спецкурсы
                        <svg className="toArrowIcon"/>
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/announcement">Объявления
                        <svg className="toArrowIcon"/>
                    </Link>
                </Nav.Item>
                {props.userRole === 'ROLE_ADMIN'  && <>
                <Nav.Item>
                    <Link className="nav-link" to="/users">Пользователи
                        <svg className="toArrowIcon"/>
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/ad">
                        <svg className="toPlusIcon"/>
                        реклама</Link>
                </Nav.Item></>
            }

                <Nav.Item>
                    <Link className="nav-link" to="/add_data">
                        <svg className="toPlusIcon"/>
                        данных</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/add_time">
                        <svg className="toPlusIcon"/>
                        время
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/dir">
                        <svg className="toPlusIcon"/>
                        директор
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/add_new_year">
                        <svg className="toPlusIcon"/>
                        учебный год
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" id="last-nav-link" to="/select_theme">
                        Оформление   <svg className="toArrowIcon"/>
                    </Link>
                </Nav.Item>

            </Nav>
        </>
    )
};
