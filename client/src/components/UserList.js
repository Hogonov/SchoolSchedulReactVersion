import React from 'react'
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";

export const UserList = ({users: users}) => {
    if (!users.length) {
        return <p className="center">Пользователей пока нет</p>
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Логин</th>
                    <th>Школа</th>
                    <th>Роль</th>
                    <th>Открыть</th>
                </tr>
                </thead>

                <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.login}</td>
                            <td>{user.school}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/detail_user/${user._id}`}>Открыть</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <h1/>
            <Button href="/add_new_user" className="btn yellow darken-4">Добавить пользователя</Button>
        </div>
    )
};
