import React, {useContext} from 'react'
import {Nav} from "react-bootstrap";


export const Sidebar = () => {
    return (
            <>
                <Nav className="sidebar">
                    <Nav.Item>
                        <Nav.Link className="nav-link" href="/editor">Редактор
                            <svg className="toArrowIcon"/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-link" href="/editor_special_course">Спецкурсы
                            <svg className="toArrowIcon"/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-link" href="/announcement">Объявления
                            <svg className="toArrowIcon"/>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-link" href="/add_data"> <svg className="toPlusIcon"/> данных</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-link" href="/add_time">
                            <svg className="toPlusIcon"/> время
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-link" href="/dir">
                            <svg className="toPlusIcon"/> директор
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-link" id="last-nav-link" href="/add_new_year">
                            <svg className="toPlusIcon"/> учебный год
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </>
    )
};
