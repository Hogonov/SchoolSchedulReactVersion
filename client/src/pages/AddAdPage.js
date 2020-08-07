import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import axios from "axios";

export const AddAdPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        name: '', imageName: ''
    });
    const [image, setImage] = useState();

    const changeHandler = event => {
        try {
            setForm({...form, [event.target.name]: event.target.value});
        } catch (e) {
        }
    };
    const changeFileHandler = event => {
        try {
            setForm({...form, imageName: event.target.value});
            setImage({image: event.target.files[0]});
        } catch (e) {
            console.log(e)
        }

    };

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const addDirHandler = async () => {
        try {
            let formData = new FormData();
            formData.append('image', image.image);

            const data = await request('/api/ad/add', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            const dataFile = await axios.put(`/api/ad/add_file/${data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.token}`
                },
            });
            message(dataFile.data.message)
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
                            <h1/>
                            <div className="input-field">
                                <input
                                    placeholder="Введите название"
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="yellow-input"
                                    value={form.name}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="name">Название</label>
                            </div>
                            <h1/>
                            <label className="white-text">Картинка</label>
                            <div style={{marginTop: 10}}>
                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    className="yellow-input"
                                    value={form.imageName}
                                    onChange={changeFileHandler}
                                />
                            </div>
                            <h1/>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={addDirHandler}
                        >
                            Добавить рекламу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};