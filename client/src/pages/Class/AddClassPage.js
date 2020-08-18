import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";

export const AddClassPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        subjectName: '', classroomName: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const addSubjectHandler = async () => {
        try {
            const data = await request('/api/table/subject', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };

    const addClassroomHandler = async () => {
        try {
            const data = await request('/api/table/classroom', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
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
                        <div className="input-group mb-3">
                            <div className="input-field">
                                <input
                                    placeholder="Введите назнавние класса"
                                    id="classroomName"
                                    type="text"
                                    name="classroomName"
                                    className="yellow-input"
                                    value={form.classroomName}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="classroomName">Класс</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={addSubjectHandler}
                        >
                            Добавить предмет
                        </button>
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={addClassroomHandler}
                        >
                            Добавить класса
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};