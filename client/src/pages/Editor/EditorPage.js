import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from 'react-select';
import {Loader} from "../../components/Loader";
import Grid from "@material-ui/core/Grid";
import styleEditorPage from "./StyleEditorPage.module.css"
import stylesTimePage from "../Time/TimePage.module.css";


export const EditorPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [time, setTime] = useState({time: []});
    const [form, setForm] = useState({
        classroom: '',
        session: '',
        time: [],
        day: '',
        subject1: '', office1: '',
        subject2: '', office2: '',
        subject3: '', office3: '',
        subject4: '', office4: '',
        subject5: '', office5: '',
        subject6: '', office6: '',
    });
    const [state, setState] = useState({
        classroom: []
    });
    const [options, setOptions] = useState({classrooms: [], subjects: [], firstTimes: [], secondTimes: []});
    const days = [
        {value: 'понедельник', label: 'Понедельник'},
        {value: 'вторник', label: 'Вторник'},
        {value: 'среда', label: 'Среда'},
        {value: 'четверг', label: 'Четверг'},
        {value: 'пятница', label: 'Пятница'},
        {value: 'суббота', label: 'Суббота'},
        {value: 'воскресенье', label: 'Воскресенье'},
    ];
    /*const getData = useCallback(async () => {
        try {
            const data = await request(`/api/table/get_all_data`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });


            setOptions({
                classrooms: data.classrooms,
                subjects: data.subjects,
                firstTimes: data.firstTimes[0].time,
                secondTimes: data.secondTimes[0].time,
            });
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }, [auth.token]);

    useEffect(() => {
        getData();
    }, [getData]);

    const changeHandlerSession = event => {
        try {
            if (event.value === 'first')
                setTime(options.firstTimes);
            else if (event.value === 'second')
                setTime(options.secondTimes);
            else if(event.value === 'specialFirst')
                setTime(options.firstSpecialTimes);
            else if(event.value === 'specialSecond')
                setTime(options.secondSpecialTimes);

            setForm({...form, session: event.value, time: time});
            console.log(time);
        }catch (e) {

        }

    };

    const changeHandlerClassroom = event => {
        try {
            setForm({...form, classroom: event.value});
        }catch (e) {

        }
    };
    const changeHandlerDays = event => {

        try {
            setForm({...form, day: event.value});
        }catch (e) {

        }
    };
    const changeHandlerInput = event => {
        setForm({...form, [event.target.id]: event.target.value})
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
            const data = await request('/api/table/editor', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {

        }
    }; */


    if (loading)
        return <Loader/>;
    return <div className={styleEditorPage.main}>
        <h3 className={styleEditorPage.title}>Редактирование текущего расписания</h3>

        <div className={styleEditorPage.filterSelectors}>
            <Select
                id="classroom"
                placeholder="Класс"
                className={styleEditorPage.selector}
                options={options.classrooms}
                name="classroom"
            />
            <Select
                id="days"
                placeholder="День недели"
                className={styleEditorPage.selector}
                options={days}
                name="days"
            />
            <Select
                id="session"
                placeholder="Смена"
                className={styleEditorPage.selector}
                name="session"
            />
        </div>
        <div className={styleEditorPage.arrows}>
            <svg className={styleEditorPage.leftArrow}/>
            <svg className={styleEditorPage.rightArrow}/>
        </div>
        <div className={styleEditorPage.subMain}>
            <table className={styleEditorPage.table}>
                <thead className={styleEditorPage.tableHead}>
                <tr>
                    <td>№</td>
                    <td className={styleEditorPage.subjects}>Предмет</td>
                    <td>Кабинет</td>
                </tr>
                </thead>
                <tbody className={styleEditorPage.cellTable}>
                <tr>
                    <td>1</td>
                    <td>
                        <Select
                            id="lesson"
                            placeholder="Урок"
                            className={`black-text ${styleEditorPage.tableSelector}`}
                            name="lesson"
                        />
                    </td>
                    <td>1</td>
                </tr>
                </tbody>
            </table>
            <h5 className={styleEditorPage.addLesson}>+ урок</h5>
            <button
                className={`btn ${styleEditorPage.button}`}
                disabled={loading}

            >
                Отправить
            </button>
        </div>


    </div>
};