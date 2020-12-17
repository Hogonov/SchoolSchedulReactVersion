import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from 'react-select';
import {Loader} from "../../components/Loader";
import Grid from "@material-ui/core/Grid";
import styleEditorSpecialCourse from "./EditorSpecialCoursePage.module.css";
import stylesTimePage from "../Time/TimePage.module.css";
import {DayBock} from "./DayBlock";

export const EditorSpecialCoursePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        courses: [
            {time1: '', time2: '', time3: '', name1: '', name2: '', name3: '', day: 'Понедельник'},
            {time1: '', time2: '', time3: '', name1: '', name2: '', name3: '', day: 'Вторник'},
            {time1: '', time2: '', time3: '', name1: '', name2: '', name3: '', day: 'Среда'},
            {time1: '', time2: '', time3: '', name1: '', name2: '', name3: '', day: 'Четверг'},
            {time1: '', time2: '', time3: '', name1: '', name2: '', name3: '', day: 'Пятница'},
            {time1: '', time2: '', time3: '', name1: '', name2: '', name3: '', day: 'Суббота'}
            ]
    });

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const sendHandler = async (event) => {
        try {
            const data = await request('/api/special_course/add', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
            console.log(form)
        } catch (e) {
        }
    };


    if (loading)
        return <Loader/>;
    return (
        <div className={styleEditorSpecialCourse.main}>
            <h3 className={styleEditorSpecialCourse.title}>Редактирование расписания спецкурсов</h3>
            <table className={styleEditorSpecialCourse.mainTable}>
                <tr>
                    <td className={`${styleEditorSpecialCourse.dayBlock} ${styleEditorSpecialCourse.leftBlock}`}>
                        <h3>Понедельник</h3>
                        <DayBock form={form} setForm={setForm} day={0}/>
                    </td>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Вторник</h3>
                        <DayBock form={form} setForm={setForm} day={1}/>
                    </td>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Среда</h3>
                        <DayBock form={form} setForm={setForm} day={2}/>
                    </td>
                </tr>
                <tr>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Четверг</h3>
                        <DayBock form={form} setForm={setForm} day={3}/>
                    </td>
                    <td className={styleEditorSpecialCourse.dayBlock}>
                        <h3>Пятница</h3>
                        <DayBock form={form} setForm={setForm} day={4}/>
                    </td>
                    <td className={`${styleEditorSpecialCourse.dayBlock} ${styleEditorSpecialCourse.leftBlock}`}>
                        <h3>Суббота</h3>
                        <DayBock form={form} setForm={setForm} day={5}/>
                    </td>
                </tr>
            </table>
            <h1/>
            <button
                className={`btn ${styleEditorSpecialCourse.button}`}
                disabled={loading}
                onClick={sendHandler}
            >
                Отправить
            </button>
        </div>
    )
};