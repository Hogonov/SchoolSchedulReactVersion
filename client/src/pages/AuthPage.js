import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
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

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch (e) {
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.userRole)
        } catch (e) {
        }
    };

    return (
        <div className="row">
            <h1/>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите login"
                                    id="login"
                                    type="text"
                                    name="login"
                                    className="yellow-input"
                                    value={form.login}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="login">Login</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <Button
                            disabled={loading}
                            href="/select_view"
                            className="btn yellow darken-4"
                        >Расписание</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};
