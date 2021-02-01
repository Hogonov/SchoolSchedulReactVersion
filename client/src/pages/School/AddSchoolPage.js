import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from '../../context/AuthContext'

export const AddSchoolPage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        schoolName: ''
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

    const addHandler = async () => {
        try {
            const data = await request('/api/table/add_school', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message);
            history.push(`/add_data_admin/${data.school._id}`);
        } catch (e) {
        }
    };

    const chooseHandler = async () => {
        try {
            const data = await request('/api/table/choose_school', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message);
            history.push(`/add_data_admin/${data.school._id}`);
        } catch (e) {
        }
    };

    return (
        <div className="row">
            <h1/>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Добавление данных</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите школу"
                                    id="schoolName"
                                    type="text"
                                    name="schoolName"
                                    className="custom-input"
                                    value={form.schoolName}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="schoolName">Школа</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={chooseHandler}
                        >
                            Выбрать школу
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={addHandler}
                            disabled={loading}
                        >
                            Добавить школу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
