import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Grid from "@material-ui/core/Grid";
import stylesYearSchoolPage from './YearSchoolPage.module.css';
import stylesTimePage from "../Time/TimePage.module.css";
import {Quarter} from "./Quarter";

export const AddYearSchoolPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        nameYear: '',
        startQuarter1: Date, endQuarter1: Date,
        startQuarter2: Date, endQuarter2: Date,
        startQuarter3: Date, endQuarter3: Date,
        startQuarter4: Date, endQuarter4: Date
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

    const sendHandler = async () => {
        try {
            console.log(form);
            const data = await request('/api/quarter/add', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };


    return (
        <div className={stylesYearSchoolPage.main} id='main'>
            <h3 className={stylesYearSchoolPage.title}>Редактор расписания даты занятий</h3>
            <input className={stylesYearSchoolPage.titleYear}
                   type="text"
                   placeholder="Введите название года"
                   onChange={changeHandler}
                   name="nameYear"
            />
            <div className={stylesYearSchoolPage.quarters}>
                <Quarter nameQuarter="Четверть I"
                         name="Quarter1"
                         form={form}
                         setForm={setForm}
                         dateStart={form.startQuarter1}
                         dateEnd={form.endQuarter1}
                />
                <Quarter nameQuarter="Четверть II"
                         name="Quarter2"
                         form={form}
                         setForm={setForm}
                         dateStart={form.startQuarter2}
                         dateEnd={form.endQuarter2}
                />
                <Quarter nameQuarter="Четверть III"
                         name="Quarter3"
                         form={form}
                         setForm={setForm}
                         dateStart={form.startQuarter3}
                         dateEnd={form.endQuarter3}
                />
                <Quarter nameQuarter="Четверть VI"
                         name="Quarter4"
                         form={form}
                         setForm={setForm}
                         dateStart={form.startQuarter4}
                         dateEnd={form.endQuarter4}
                />
            </div>
            <h1/>
            <button
                className={`btn ${stylesYearSchoolPage.button}`}
                disabled={loading}
                onClick={sendHandler}
            >
                Отправить
            </button>
        </div>
    )
};