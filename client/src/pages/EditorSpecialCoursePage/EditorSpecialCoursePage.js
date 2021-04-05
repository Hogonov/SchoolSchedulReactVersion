import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import styleEditorSpecialCourse from "./EditorSpecialCoursePage.module.css";
import {DayBock} from "./DayBlock";

export const EditorSpecialCoursePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        courses: [
            {day: 'Понедельник', course: [{index: 1, name: '', time: ''}]},
            {day: 'Вторник', course: [{index: 1, name: '', time: ''}]},
            {day: 'Среда', course: [{index: 1, name: '', time: ''}]},
            {day: 'Четверг', course: [{index: 1, name: '', time: ''}]},
            {day: 'Пятница', course: [{index: 1, name: '', time: ''}]},
            {day: 'Суббота', course: [{index: 1, name: '', time: ''}]}
        ]
    });
    const getHandler =useCallback( async () => {
        try {
            const data = await request('/api/special_course/get_course', 'GET', null, {Authorization: `Bearer ${auth.token}`});
            setForm({...form, courses: data.courses.courses})
        } catch (e) {
        }
    },[auth.token])

    useEffect(() => {
        getHandler()
    }, [getHandler]);

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
        } catch (e) {
        }
    };


    if (loading)
        return <Loader/>;
    return (
        <div id='main' className={styleEditorSpecialCourse.main}>
            <h3 className={styleEditorSpecialCourse.title}>Редактирование расписания спецкурсов</h3>
            <table className={styleEditorSpecialCourse.mainTable}>
                <tbody>
                <tr>
                    <td className={`${styleEditorSpecialCourse.dayBlock}`}>
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
                    <td className={`${styleEditorSpecialCourse.dayBlock}`}>
                        <h3>Суббота</h3>
                        <DayBock form={form} setForm={setForm} day={5}/>
                    </td>
                </tr>
                </tbody>
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