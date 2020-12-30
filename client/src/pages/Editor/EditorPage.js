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
    const [filterFlag, setFilterFlag] = useState(false);
    const [deleteBlocker, setDeleteBlocker] = useState(true);
    const [selectedOption, setSelectedOption] = useState({
        classname: null,
        day: null,
        session: null,
        subject: [{option: null}]
    })
    const [time, setTime] = useState({time: []});
    const [indexDay, setIndexDay] = useState({
        index: 0
    });
    const [fullForm, setFullForm] = useState({
        form: [{
            classroom: '',
            session: '',
            time: [],
            day: '',
            subjects: [{index: 1, name: 'subject-1', option: null, office: ''}]
        }]
    });
    const [form, setForm] = useState({
        classname: '',
        session: '',
        time: [],
        day: '',
        subjects: [{index: 1, name: 'subject-1', option: null, office: ''}]
    });

    const [options, setOptions] = useState({classrooms: [], subjects: [], firstTimes: [], secondTimes: []});
    const days = [
        {value: 'понедельник', label: 'Понедельник', name: 'day'},
        {value: 'вторник', label: 'Вторник', name: 'day'},
        {value: 'среда', label: 'Среда', name: 'day'},
        {value: 'четверг', label: 'Четверг', name: 'day'},
        {value: 'пятница', label: 'Пятница', name: 'day'},
        {value: 'суббота', label: 'Суббота', name: 'day'},
    ];

    const [classInfo, setClassInfo] = useState({
        name: '',
        session: '',
        days: [{
            name: '',
            subjects: [{name: '', option: null, office: ''}]
        }],
        school: '',
        date: new Date()
    });
    const getData = useCallback(async () => {
        try {
            const data = await request(`/api/table/get_all_data`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });

            setOptions({
                classrooms: data.classrooms,
                subjects: data.subjects,
                times: [data.times.firstSession.options, data.times.secondSession.options],
            });
            console.log(form.classes)
            //console.log(selectedOption.selectedSubjectOption[0].option)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }, [auth.token]);

    useEffect(() => {
        getData();
    }, [getData]);

    /*const changeHandlerSession = event => {
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
    */
    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    /*
    const sendHandler = async () => {
        try {
            console.log(form);
            const data = await request('/api/table/editor', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {

        }
    }; */


    const getDataClassroom = useCallback(async (classname) => {
        try {
            const data = await request(`/api/table/get_data_class/${classname}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });
            console.log(data);
            if (data.candidate) {
                // set state classInfo
            }
        } catch (e) {
            console.log(e);
        }


    }, [auth.token]);

    const searchHandler = useCallback(async (event) => {
        try {
            setForm({...form, classname: event});
            setFilterFlag(true)
            await getDataClassroom(event.value);
        } catch (e) {
            console.log(e);
        }

    }, [getDataClassroom, selectedOption, setSelectedOption, setForm, form]);

    const addLesson = () => {
        if (form.subjects.length < 10) {
            let subArr = form.subjects
            let index = subArr.length + 1
            subArr.push({index: index, name: `subject-${index}`, option: null, office: ''})
            setForm({...form, subjects: subArr})
        }
    }

    const switchHandler = (event) => {
        //переключение между днями недели
    }

    const deleteHandler = (event) => {
        if (form.subjects.length > 1) {
            let deleteIndex = +event.target.id.split('-')[1]
            console.log(deleteIndex)
            let subArr = []
            form.subjects.splice(deleteIndex - 1, 1)
            //console.log(form.subjects)
           for (let i = 0; i < form.subjects.length; i++) {
                console.log(deleteIndex)
                subArr.push({...form.subjects[i], index: i + 1, name: `subject-${i + 1}`})
              if( i > 10) break
            }

            console.log(subArr)
           setForm({...form, subjects: subArr})
        }

    }

    const selectHandler = (event, action) => {
        if (action.name.indexOf('subject') !== -1) {
            let index = +action.name.split('-')[1]
            let subjectsArr = []
            for (let i = 0; i < form.subjects.length; i++) {
                console.log(index)
                if (index === (i + 1)) {
                    subjectsArr.push({...form.subjects[i], option: event})
                    console.log('arr', subjectsArr)
                } else {
                    subjectsArr.push(form.subjects[i])
                }
            }
            setForm({...form, subjects: subjectsArr})
        } else {
            console.log(action)
            setForm({...form, [action.name]: event})
        }

    }

    const changeSubjectHandler = event => {
        try {
            let index = +event.target.name.split('-')[1]
            let subjectsArr = []
            for (let i = 0; i < form.subjects.length; i++) {
                if (index === (i + 1)) {
                    subjectsArr.push({...form.subjects[i], office: event.target.value})
                } else {
                    subjectsArr.push(form.subjects[i])
                }
            }
            setForm({...form, subjects: subjectsArr})
        } catch (e) {
            console.log(e)
        }
    }

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
                value={form.classname}
                onChange={searchHandler}
                name="classroom"
            />
            <div>
                <Select
                    id="day"
                    placeholder="День недели"
                    className={styleEditorPage.selector}
                    options={days}
                    value={form.day}
                    onChange={selectHandler}
                    name="day"
                />
                <Select
                    id="session"
                    placeholder="Смена"
                    className={styleEditorPage.selector}
                    name="session"
                    onChange={selectHandler}
                    value={form.session}
                    options={options.times}
                    // допил
                />
            </div>
        </div>
        <div>
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
                    {Array.from(form.subjects, subject => {
                        return (
                            <tr>
                                <td>{subject.index}</td>
                                <td>
                                    <Select
                                        id="lesson"
                                        placeholder="Урок"
                                        className={`black-text ${styleEditorPage.tableSelector}`}
                                        name={`subject-${subject.index}`}
                                        options={options.subjects}
                                        value={subject.option}
                                        onChange={selectHandler}
                                    />
                                </td>
                                <td>
                                    <input name={`office-${subject.index}`}
                                           type="number"
                                           className={styleEditorPage.input}
                                           value={subject.office}
                                           onChange={changeSubjectHandler}
                                    />
                                </td>

                                {form.subjects.length > 1 && <td className={styleEditorPage.redCross}>
                                    <svg id={`delete-${subject.index}`}
                                         onClick={deleteHandler}
                                    />
                                </td>}

                            </tr>)
                    })}

                    </tbody>
                </table>
                <button className={`btn ${styleEditorPage.addLesson}`} onClick={addLesson}>+ урок</button>
                <h1/>
                <button
                    className={`btn ${styleEditorPage.button}`}
                    disabled={loading || !filterFlag}

                >
                    Отправить
                </button>
            </div>
        </div>


    </div>
};