import React, {useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {useMessage} from "../../hooks/message.hook";


export const AddAnnouncementPage = () => {
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [announcement, setAnnouncement] = useState({name: '', text: '', deleteDate: new Date()});
    const userId = useParams().id;


    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setAnnouncement({...announcement, [event.target.name]: event.target.value})
    };

    if (loading) {
        return <Loader/>
    }

    const sendHandler = async () => {
        try {
            const data = await request('/api/announcement/add', 'POST', {...announcement}, {Authorization: `Bearer ${token}`});
            message(data.message);
        } catch (e) {
        }
    };

    return (
        <div>
            {!loading && announcement &&
            <div className="md-form row">
                <h1/>
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Добавление объявлений</span>
                            <h1/>
                            <div className="input-field">
                                <label htmlFor="name" className="white-text">Название</label>
                                <input
                                    placeholder="Введите название объявления"
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="custom-input white-text"
                                    value={announcement.name}
                                    onChange={changeHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="text" className="white-text">Текст объявления</label>
                                <textarea
                                    placeholder="Введите тест объявления"
                                    id="text"
                                    name="text"
                                    className="form-control white-text border-white"
                                    rows="5"
                                    style={{resize: 'vertical', borderColor: 'white'}}
                                    value={announcement.text}
                                    onChange={changeHandler}
                                />
                            </div>
                            <h1/>

                            <label htmlFor="deleteDate" className="white-text">Дата удаления</label>
                            <input
                                id="deleteDate"
                                type="date"
                                name="deleteDate"
                                className="custom-input white-text"
                                value={announcement.deleteDate}
                                onChange={changeHandler}
                            />


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