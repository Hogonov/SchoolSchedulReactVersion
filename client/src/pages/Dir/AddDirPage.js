import React, {useCallback, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import axios from "axios";
import style from './DirStyle.module.css'

export const AddDirPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        name: '', phone: '', email: '',imageName: ''
    });
    const [image, setImage] = useState();

    const getData = useCallback(async () => {
        try {
            const data = await request('/api/dir/get_data_form', 'GET', null,
                {Authorization: `Bearer ${auth.token}`});
            if(data.candidate){
                setForm({...form,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                })
            }

        } catch (e) {

        }
    }, [request, auth.token])

    useEffect(() => {
        getData()
    }, [getData])

    const changeHandler = event => {
        try {
            console.log(form)
            setForm({...form, [event.target.name]: event.target.value});
        } catch (e) {
            console.log(e)
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

            const data = await request('/api/dir/add', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            const dataFile = await axios.put(`/api/dir/add_file/${data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.token}`
                }
            });
            message(dataFile.data.message)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div id='main' className={style.main}>
            <div className={style.title}>Добавление данных директора</div>
            <div className={style.formGrope}>
                <div className={style.title}>1) ФИО</div>
                <div className={style.group}>
                    <input
                        name='name'
                        onChange={changeHandler}
                        className='custom-input'
                        type='text'
                        placeholder='Введите ФИО'
                        value={form.name}
                    />
                </div>
            </div>
            <div className={style.formGrope}>
                <div className={style.title}>2) Дополнительная информация</div>
                <div className={style.group}>
                    <input
                        className='custom-input'
                        name='phone'
                        type='text'
                        onChange={changeHandler}
                        placeholder='Введите номер телефона приемной школы'
                        value={form.phone}
                    />
                    <input
                        className='custom-input'
                        name='email'
                        type='text'
                        onChange={changeHandler}
                        placeholder='Введите адрес электронной почты школы'
                        value={form.email}
                    />
                </div>
            </div>
            <div className={style.formGrope}>
                <div className={style.title}>3) Фотография</div>
                <div className={style.group}>
                    <input
                        name='image'
                        onChange={changeFileHandler}
                        className={`custom-input-file ${style.photo}`}
                        type='file'
                        value={form.imageName}
                    />
                </div>
            </div>
            <button onClick={addDirHandler} className={`btn ${style.button}`}>Добавить</button>
        </div>
    )
};