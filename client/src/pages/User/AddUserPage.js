import React, {useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {useMessage} from "../../hooks/message.hook";


export const AddUserPage = () => {
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [user, setUser] = useState({login: '', password: '', role: '', school: ''});



    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setUser({...user, [event.target.name]: event.target.value})
    };

    if (loading) {
        return <Loader/>
    }

    const sendHandler = async () => {
        try {
            const data = await request('/api/users/add_user', 'POST', {...user}, {Authorization: `Bearer ${token}`});
            message(data.message);
        } catch (e) {
        }
    };

    return (
        <div>
            {!loading && user &&
            <div className="row">
                <h1/>
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Редактирование данных</span>
                            <div className="input-group">
                                <label htmlFor="login" className="white-text">Login</label>
                                <input
                                    placeholder="Введите login"
                                    id="login"
                                    type="text"
                                    name="login"
                                    className="custom-input white-text"
                                    value={user.login}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="white-text">Пароль</label>
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="custom-input white-text"
                                    value={user.password}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="input-group">
                                <label htmlFor="role" className="white-text">Роль</label>
                                <input
                                    placeholder="Введите роль"
                                    id="role"
                                    type="text"
                                    name="role"
                                    className="custom-input white-text"
                                    value={user.role}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="input-group">
                                <label htmlFor="school" className="white-text">Школа</label>
                                <input
                                    placeholder="Введите школу"
                                    id="school"
                                    type="text"
                                    name="school"
                                    className="custom-input white-text"
                                    value={user.school}
                                    onChange={changeHandler}
                                />

                            </div>


                        </div>
                        <div className="card-action">
                            <button
                                className="btn yellow darken-4"
                                style={{marginRight: 10}}
                                disabled={loading}
                                onClick={sendHandler}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
};