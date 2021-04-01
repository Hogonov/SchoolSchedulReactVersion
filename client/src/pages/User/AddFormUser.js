import React, {useCallback, useContext, useEffect, useState} from "react";
import style from './StyleUsersPage.module.css'
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import styleEditorPage from "../Editor/StyleEditorPage.module.css";


export const AddFormUser = props => {

    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const changeHandler = event => {
        props.setUser({...props.user, [event.target.name]: event.target.value});
    };

    const selectHandler = (event, action) => {
        props.setUser({...props.user, school: event});
    }

    const sendHandler = async () => {
        try {
            const data = await request('/api/users/add_user', 'POST', {...props.user}, {Authorization: `Bearer ${props.token}`});
            message(data.message);
            if(data.ok) {
                props.setFlag({...props.flag, update: true})
            }
        } catch (e) {
        }
    };

    return (
        <div className={style.addFormUser}>
            <h2>Новый пользователь:</h2>
            <form>
                <div className={style.inputBlock}>
                    <h5>Логин:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='login'
                            type='text'
                            placeholder='Введите логин'
                            value={props.user.login}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Пароль:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='password'
                            type='password'
                            placeholder='Введите пароль'
                            value={props.user.password}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Роль:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='role'
                            type='text'
                            placeholder='Введите название роли'
                            value={props.user.role}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Школа:</h5>
                    <div>
                        <Select
                            placeholder="Введите название школы"
                            className={style.selector}
                            name="session"
                            onChange={selectHandler}
                            value={props.user.school}
                            options={props.schoolForm.schools}
                        />
                    </div>
                </div>
            </form>
            <h2/>
            <button onClick={sendHandler} className={`btn ${style.button}`}>Добавить</button>
            <h2/>
        </div>
    );
};