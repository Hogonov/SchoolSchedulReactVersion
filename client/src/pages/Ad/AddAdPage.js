import React, {useCallback, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import axios from "axios";
import Select from "react-select";
import style from './AdPage.module.css'
import {Loader} from "../../components/Loader";
import {AdListPage} from "./AdListPage";
import {AddFormPage} from "./AdFormPage";

export const AddAdPage = () => {
    const {token} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [options, setOptions] = useState({schools: []});
    const [ads, setAds] = useState([]);
    const [edit, setEdit] = useState({
        text: 'Новая реклама', flag: false
    })
    const [flag, setFlag] = useState({
        view: false,
        update: false,
        isReady: false
    })
    const [form, setForm] = useState({
        name: '', school: '',imageName: ''
    });
    const [image, setImage] = useState();

    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request('/api/ad/get_all', 'GET', null, {Authorization: `Bearer ${token}`});
            setAds(fetched.ad);
            setFlag({...flag, isReady: fetched.isReady})
        } catch (e) {
        }
    }, [token, request])

    const getSchool = useCallback(async () => {
        try {
            const fetched = await request(`/api/table/get_school`, 'GET', null);
            setOptions(fetched);
        } catch (e) {

        }
    }, [token, request])

    const deleteHandler = async (event) => {
        try {
            const response = await request(`/api/ad/delete/${event.target.id}`, 'DELETE', null, {Authorization: `Bearer ${token}`});
            message(response.message);
            fetchAds();
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchAds()
        getSchool()
    }, [getSchool, fetchAds]);

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);


    const viewForm = () => {
        setFlag({...flag, view: !flag.view})
    }

    if (loading || !flag.isReady) {
        return <Loader/>
    }
    return (
        <div id='main' className={style.main}>
            <h1 className={style.title}>Реклама</h1>
            {!loading &&<AdListPage
                edit={edit}
                setEdit={setEdit}
                options={options}
                setOptions={setOptions}
                form={form}
                setForm={setForm}
                ads={ads}
                setAds={setAds}
                flag={flag}
                setFlag={setFlag}
                deleteHandler={deleteHandler}
            />}
            <h1/>
            <button className={`btn ${style.button}`} onClick={viewForm}>Новая реклама</button>
            {flag.view && <AddFormPage
                edit={edit}
                setEdit={setEdit}
                form={form}
                setForm={setForm}
                image={image}
                setImage={setImage}
                options={options}
                setOptions={setOptions}
                message={message}
                fetchAds={fetchAds}
            />}
        </div>
    )
};