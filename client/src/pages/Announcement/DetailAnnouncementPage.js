import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {UserCard} from "../../components/UserCard";
import {useMessage} from "../../hooks/message.hook";
import DatePicker from "react-datepicker"


export const DetailAnnouncementPage = () => {
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [announcement, setAnnouncement] = useState({name: '', text: '', deleteDate: new Date()});
    const announcementId = useParams().id;


    const getAnnouncement = useCallback(async () => {
        try {
            const fetched = await request(`/api/announcement/get_data/${announcementId}`, 'GET', null, {Authorization: `Bearer ${token}`});
            console.log(fetched);
            setAnnouncement(fetched);
            console.log(announcement);
        } catch (e) {
            console.log(e);
        }
    }, [token, announcementId, request]);

    useEffect(() => {
        getAnnouncement();
    }, [getAnnouncement]);

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);



    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setAnnouncement({...announcement, [event.target.name]: event.target.value});
        console.log(announcement);
    };

    if (loading) {
        return <Loader/>
    }



    const sendHandler = async () => {
        try {
            const data = await request(`/api/announcement/edit/${announcementId}`, 'PUT', {...announcement}, {Authorization: `Bearer ${token}`});
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
                            <div className="input-group">
                                <label htmlFor="name" className="white-text">Название</label>
                                <input
                                    placeholder="Введите название объявления"
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="yellow-input white-text"
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
                                    className="form-control white-text"
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
                                className="yellow-input white-text"
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