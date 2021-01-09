import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from 'react-select';
import {Loader} from "../../components/Loader";
import Grid from "@material-ui/core/Grid";


export const EditorPage2 = () => {
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
    const getData = useCallback(async () => {
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
    };


    if (loading)
        return <Loader/>;
    return (
        <div className="row">
            <h1/>
            <div className="col s7 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Редактор расписания</span>
                        <div>
                            <label htmlFor="classroom" className="white-text">Класс</label>
                            <Select onChange={changeHandlerClassroom}
                                    id="classroom"
                                    placeholder="Выберите класс"
                                    className="black-text"
                                    options={options.classrooms}
                                    name="classroom"
                            />

                            <label htmlFor="session" className="white-text">Смена</label>
                            <Select onChange={changeHandlerSession}
                                    id="session"
                                    placeholder="Выберите смену"
                                    className="black-text"
                                    options={[{value: "first", label: "Первая смена"},
                                            {value: "second", label: "Вторая смена"}
                                        ]
                                    }
                                    name="session"
                            />
                            <label htmlFor="classroom" className="white-text">День недели</label>
                            <Select onChange={changeHandlerDays}
                                    id="classroom"
                                    placeholder="Выберите день недели"
                                    className="black-text"
                                    options={days}
                                    name="classroom"
                            />
                            <h1/>
                            <Grid container spacing={3}>
                                <Grid item style={{flexGrow: 1}}>
                                    <label className="white-text">Время</label>
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <label className="white-text"
                                           style={{marginLeft: 70}}>Предметы</label>
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <label className="white-text"
                                           style={{marginLeft: 10}}>Кабинеты</label>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item style={{flexGrow: 0}}>
                                    <input
                                        id={`time1`}
                                        value={time[0]}
                                        type="text"
                                        name="subject"
                                        className="yellow-input white-text"
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <input
                                        placeholder="Введите предмет"
                                        id={`subject1`}
                                        type="text"
                                        name="subject"
                                        className="yellow-input"
                                        value={form.subject1}
                                        onChange={changeHandlerInput}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input onChange={changeHandlerInput}
                                           id="office1"
                                           placeholder="Введите кабинет"
                                           className="yellow-input white-text"
                                           name="office"
                                    />
                                </Grid>
                                <h1/>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow: 0}}>
                                    <input
                                        id={`time2`}
                                        value={time[1]}
                                        type="text"
                                        name="subject"
                                        className="yellow-input white-text"
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <input
                                        placeholder="Введите предмет"
                                        id={`subject2`}
                                        type="text"
                                        name="subject"
                                        className="yellow-input"
                                        value={form.subject2}
                                        onChange={changeHandlerInput}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input onChange={changeHandlerInput}
                                           id="office2"
                                           placeholder="Введите кабинет"
                                           className="yellow-input white-text"
                                           name="office"
                                    />
                                </Grid>
                                <h1/>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow: 0}}>
                                    <input
                                        id={`time3`}
                                        value={time[2]}
                                        type="text"
                                        name="subject"
                                        className="yellow-input white-text"
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <input
                                        placeholder="Введите предмет"
                                        id={`subject3`}
                                        type="text"
                                        name="subject"
                                        className="yellow-input"
                                        value={form.subject3}
                                        onChange={changeHandlerInput}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input onChange={changeHandlerInput}
                                           id="office3"
                                           placeholder="Введите кабинет"
                                           className="yellow-input white-text"
                                           name="office"
                                    />
                                </Grid>
                                <h1/>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow: 0}}>
                                    <input
                                        id={`time4`}
                                        value={time[3]}
                                        type="text"
                                        name="subject"
                                        className="yellow-input white-text"
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <input
                                        placeholder="Введите предмет"
                                        id={`subject4`}
                                        type="text"
                                        name="subject"
                                        className="yellow-input"
                                        value={form.subject4}
                                        onChange={changeHandlerInput}
                                    />
                                </Grid>
                                <h1/>
                                <Grid item style={{flexGrow: 1}}>
                                    <input onChange={changeHandlerInput}
                                           id="office4"
                                           placeholder="Введите кабинет"
                                           className="yellow-input white-text"
                                           name="office"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow: 0}}>
                                    <input
                                        id={`time5`}
                                        value={time[4]}
                                        type="text"
                                        name="subject"
                                        className="yellow-input white-text"
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <input
                                        placeholder="Введите предмет"
                                        id={`subject5`}
                                        type="text"
                                        name="subject"
                                        className="yellow-input"
                                        value={form.subject5}
                                        onChange={changeHandlerInput}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input onChange={changeHandlerInput}
                                           id="office5"
                                           placeholder="Введите кабинет"
                                           className="yellow-input white-text"
                                           name="office"
                                    />
                                </Grid>
                                <h1/>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow: 0}}>
                                    <input
                                        id={`time6`}
                                        value={time[5]}
                                        type="text"
                                        name="subject"
                                        className="yellow-input white-text"
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 2}}>
                                    <input
                                        placeholder="Введите предмет"
                                        id={`subject6`}
                                        type="text"
                                        name="subject"
                                        className="yellow-input"
                                        value={form.subject6}
                                        onChange={changeHandlerInput}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input onChange={changeHandlerInput}
                                           id="office6"
                                           placeholder="Введите кабинет"
                                           className="yellow-input white-text"
                                           name="office"
                                    />
                                </Grid>
                                <h1/>
                            </Grid>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={sendHandler}
                        >
                            Добавить в расписание
                        </button>
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            // onClick={sendHandler}
                        >
                            Посмотреть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};