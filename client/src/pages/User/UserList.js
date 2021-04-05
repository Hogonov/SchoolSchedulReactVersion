import React, {useEffect} from 'react'
import style from './StyleUsersPage.module.css'
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";

export const UserList = (props) => {
    const message = useMessage();
    const {request} = useHttp();
    const deleteUser = async event => {
        try {
            const data = await request(`/api/users/delete_user/${event.target.id}`, 'DELETE', null, {Authorization: `Bearer ${props.token}`});
            message(data.message);
            if(data.ok) {
                props.setFlag({...props.flag, update: true})
            }
        } catch (e) {
        }
    }


    const chosenUser = event => {
        let index = event.target.id
        props.setUser({
            login: props.users[index].login,
            password: props.users[index].password,
            role: props.users[index].role,
            school: {value: props.users[index].school, label: props.users[index].school}
        })
        props.setFlag({...props.flag, form: true})
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    if (!props.users.length) {
        return <p className="center">Пользователей пока нет</p>
    }
    return (
        <div className={style.userList}>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Логин</th>
                    <th>Школа</th>
                    <th>Роль</th>
                    <th><svg className={style.editGray}/></th>
                    <th><svg className={style.deleteTh}/></th>
                </tr>
                </thead>
                <tbody>
                {props.users.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.login}</td>
                            <td>{user.school}</td>
                            <td>{user.role}</td>
                            <td>
                                <svg onClick={chosenUser} id={index} className={style.editBlue}/>
                            </td>
                            <td>
                                <svg onClick={deleteUser} id={user._id} className={style.redCross}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
};
