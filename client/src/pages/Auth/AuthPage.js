import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from '../../context/AuthContext'
import style from './Auth.module.css'
import {Link} from "react-router-dom";


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        login: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);


    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

   /* const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch (e) {
        }
    };*/

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.userRole)
        } catch (e) {
        }
    };

    return (
        <div className={style.auth}>
            <svg className={style.logo}/>
            <div>
                <form>
                    <div className={style.inputBlock}>
                        <h5>Имя пользователя - логин</h5>
                        <div>
                            <input
                                className={style.customInput}
                                onChange={changeHandler}
                                name='login'
                                type='text'
                                placeholder='Введите логин'
                                value={form.login}
                            />
                        </div>
                    </div>
                    <h1/>
                    <div className={style.inputBlock}>
                        <h5>Пароль</h5>
                        <div>
                            <input
                                className={style.customInput}
                                onChange={changeHandler}
                                name='password'
                                type='password'
                                placeholder='Введите пароль'
                                value={form.password}
                            />
                        </div>
                    </div>
                </form>
                <h1/>
                <div className={style.buttonGroup}>
                    <Link className={`btn ${style.button} ${style.button2}`} to="/view">Расписание</Link>
                    <button onClick={loginHandler} className={`btn ${style.button}`}>Войти</button>
                </div>
            </div>
        </div>
    )
};
