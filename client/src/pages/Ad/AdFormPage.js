import React, {useCallback, useContext, useEffect, useState} from "react";
import style from './AdPage.module.css'
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from 'react-select';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


export const AddFormPage = props => {
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const changeHandler = (event, action) => {
        try {
            if(!!action) {
                props.setForm({...props.form, [action.name]: event});
            } else {
                props.setForm({...props.form, [event.target.name]: event.target.value});
            }
        } catch (e) {
            console.log(e)
        }
    };
    const changeFileHandler = event => {
        try {
            props.setForm({...props.form, imageName: event.target.value});
            props.setImage({image: event.target.files[0]});
        } catch (e) {
            console.log(e)
        }

    };


    const sendHandler = async () => {
        try {
            let formData = new FormData();
            formData.append('image', props.image.image);

            const data = await request('/api/ad/add', 'POST', {...props.form}, {Authorization: `Bearer ${token}`});
            const dataFile = await axios.put(`/api/ad/add_file/${data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            message(dataFile.data.message)
            props.setForm({...props.form, imageName: ''})
            props.fetchAds()
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={style.adForm}>
            <h2 className={style.title}>Новая реклама:</h2>
            <form>
                <div className={style.inputBlock}>
                    <h5>Название:</h5>
                    <div>
                        <input
                            className='custom-input'
                            onChange={changeHandler}
                            name='name'
                            type='text'
                            placeholder='Введите название'
                            value={props.form.name}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Школа:</h5>
                    <div>
                        <Select
                            onChange={changeHandler}
                            id='school'
                            name='school'
                            placeholder='Выберете школу'
                            value={props.form.school}
                            options={props.options.schools}
                        />
                    </div>
                </div>
                <div className={style.inputBlock}>
                    <h5>Изображение:</h5>
                    <div>
                        <input
                            className={`custom-input-file ${style.inputFile}`}
                            onChange={changeFileHandler}
                            name='imageName'
                            type='file'
                            value={props.form.imageName}
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