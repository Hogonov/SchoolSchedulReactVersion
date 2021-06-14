import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from 'react-select';
import {Loader} from "../../components/Loader";
import styleEditorPage from "./StyleEditorPage.module.css"


export const EditorPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [selectedOption, setSelectedOption] = useState({
        classname: null,
        day: null,
        session: null,
        subject: [{option: null}]
    })
    const [indexDay, setIndexDay] = useState({
        index: 0
    });
    const [maxLesson, setMaxLesson] = useState({
        maxLesson: [10, 10, 10, 10]
    })
    const [isChose, setIsChose] = useState({
        class: true,
        session: true,
    })
    const [fullForm, setFullForm] = useState({
        classname: '',
        form: [
            {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Понедельник', label: 'Понедельник', name: 'day', index: "0"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Вторник', label: 'Вторник', name: 'day', index: "1"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Среда', label: 'Среда', name: 'day', index: "2"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Четверг', label: 'Четверг', name: 'day', index: "3"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Пятница', label: 'Пятница', name: 'day', index: "4"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Суббота', label: 'Суббота', name: 'day', index: "5"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }
        ]
    });
    const emptyFullForm = {
        classname: '',
        form: [
            {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Понедельник', label: 'Понедельник', name: 'day', index: "0"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Вторник', label: 'Вторник', name: 'day', index: "1"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Среда', label: 'Среда', name: 'day', index: "2"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Четверг', label: 'Четверг', name: 'day', index: "3"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Пятница', label: 'Пятница', name: 'day', index: "4"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }, {
                classname: '',
                session: '',
                time: [],
                day: {value: 'Суббота', label: 'Суббота', name: 'day', index: "5"},
                subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
            }
        ]
    }
    const [form, setForm] = useState({
        classname: '',
        session: '',
        time: [],
        day: {value: 'Понедельник', label: 'Понедельник', name: 'day', index: "0"},
        subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
    });

    const emptyForm = {
        classname: '',
        session: '',
        time: [],
        day: {value: 'Понедельник', label: 'Понедельник', name: 'day', index: "0"},
        subjects: [{index: 1, name: 'subject-1', option: null, office: '', time: ''}]
    }

    const [options, setOptions] = useState({classrooms: [], subjects: [], times: []});
    const days = [
        {value: 'Понедельник', label: 'Понедельник', name: 'day', index: "0"},
        {value: 'Вторник', label: 'Вторник', name: 'day', index: "1"},
        {value: 'Среда', label: 'Среда', name: 'day', index: "2"},
        {value: 'Четверг', label: 'Четверг', name: 'day', index: "3"},
        {value: 'Пятница', label: 'Пятница', name: 'day', index: "4"},
        {value: 'Суббота', label: 'Суббота', name: 'day', index: "5"}
    ];

    const getData = useCallback(async () => {
        try {
            const data = await request(`/api/table/get_all_data`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });
            setOptions({
                classrooms: data.classrooms,
                subjects: data.subjects,
                times: [
                    {...data.times.firstSession.options, time: data.times.firstSession.time, index: 0},
                    {...data.times.secondSession.options, time: data.times.secondSession.time, index: 1},
                ],
            });
            setMaxLesson({
                maxLesson: [
                    data.times.firstSession.time.length,
                    data.times.secondSession.time.length,
                ]
            })
        } catch (e) {
            console.log(e)
        }
    }, [auth.token]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    useEffect(() => {
        fullForm.form.splice(indexDay.index, 1, form)
        if (form.session !== '') {
            setIsChose({...isChose, session: false})
        } else {
            setIsChose({...isChose, session: true})
        }
    }, [form, setForm])




    const sendHandler = async () => {
        try {console.log(fullForm)
            const data = await request('/api/table/editor', 'POST', {...fullForm}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {

        }
    };


    const getDataClassroom = useCallback(async (classname) => {
        try {
            const data = await request(`/api/table/get_data_class/${classname.value}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            });
            if (data.candidate) {
                let fullFormArr = []
                for (let i = 0; i < fullForm.form.length; i++) {
                    if (i < data.candidateData.days.length) {
                        fullFormArr.push(data.candidateData.days[i])
                    } else {
                        fullFormArr.push({...fullForm.form[i], classname: classname})
                    }
                }
                if (fullFormArr[0].session !== '') {
                    setIsChose({...isChose, class: false, session: false})
                } else {
                    setIsChose({...isChose, class: false, session: true})
                }
                setFullForm({classname: classname, form: fullFormArr})
                setForm(fullFormArr[0])
            } else {
                setIsChose({...isChose, class: false})
            }
        } catch (e) {
            console.log(e);
        }
    }, [auth.token, isChose, setIsChose, form, setForm, fullForm, setFullForm]);

    const searchHandler = useCallback(async (event) => {
        try {
            if (event !== fullForm.classname) {
                setForm({...emptyForm, classname: event});
                setFullForm({...emptyFullForm, classname: event});
                setIndexDay({index: 0})
                await getDataClassroom(event);
            }
        } catch (e) {
            console.log(e);
        }

    }, [getDataClassroom, selectedOption, setSelectedOption, setForm, form, setIndexDay]);

    const addLesson = () => {
        if (form.subjects.length < maxLesson.maxLesson[form.session.index]) {
            let subArr = form.subjects
            let index = subArr.length + 1
            subArr.push({index: index, name: `subject-${index}`, option: null, office: '', time: ''})
            setForm({...form, subjects: subArr})
        }
    }

    const switchHandler = (event) => {  //switch days of week
        if (!isChose.class) {
            let next = +event.target.id
            let index = +indexDay.index
            let classname = form.classname
            if (index + next > days.length - 1) {
                index = 0
            } else if (index + next < 0) {
                index = days.length - 1
            } else {
                index += next
            }

            let subForm = form
            let fullFormArr = fullForm.form
            let formArr = []
            for (let i = 0; i < fullFormArr.length; i++) {
                if (+indexDay.index === i) {
                    formArr.push(subForm)
                } else {
                    formArr.push({...fullFormArr[i], classname: classname})
                }
            }
            setForm(formArr[index])
            setFullForm({classname: classname, form: formArr})
            setIndexDay({index: index})
        } else {
            message('Выберете класс')
        }
    }

    const byDaysChangeHandler = (event, action) => {
        let index = +event.index
        fullForm.form.splice(indexDay.index, 1, form)
        setForm({...fullForm.form[index], classname: fullForm.classname})
        setIndexDay({index: index})
    }

    const deleteHandler = (event) => {
        if (form.subjects.length > 1) {
            let deleteIndex = +event.target.id.split('-')[1]
            let subArr = []
            form.subjects.splice(deleteIndex - 1, 1)
            for (let i = 0; i < form.subjects.length; i++) {
                let timeSubject = ''
                if (form.session !== '') {
                    timeSubject = form.session.time[i]
                }
                subArr.push({...form.subjects[i], index: i + 1, name: `subject-${i + 1}`, time: timeSubject})
                if (i > maxLesson.maxLesson[form.session.index]) break
            }
            setForm({...form, subjects: subArr})
        }

    }

    const selectHandler = (event, action) => {
        if (action.name.indexOf('subject') !== -1) {
            let index = +action.name.split('-')[1]
            let subjectsArr = []
            for (let i = 0; i < form.subjects.length; i++) {
                if (index === (i + 1)) {
                    subjectsArr.push({...form.subjects[i], option: event, time: form.session.time[i]})
                } else {
                    subjectsArr.push(form.subjects[i])
                }
            }
            setForm({...form, subjects: subjectsArr})
        } else {
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
    return <div id='main' className={styleEditorPage.main}>
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
                    onChange={byDaysChangeHandler}
                    name="day"
                    isDisabled={isChose.class}
                />
                <Select
                    id="session"
                    placeholder="Смена"
                    className={styleEditorPage.selector}
                    name="session"
                    onChange={selectHandler}
                    value={form.session}
                    options={options.times}
                    isDisabled={isChose.class}
                />
            </div>
        </div>
        <div>
            <div className={styleEditorPage.arrows}>
                <svg onClick={switchHandler} id="-1" className={styleEditorPage.leftArrow}/>
                <svg onClick={switchHandler} id="1" className={styleEditorPage.rightArrow}/>
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
                            <tr key={subject.index}>
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
                                        isDisabled={isChose.session}
                                    />
                                </td>
                                <td>
                                    <input name={`office-${subject.index}`}
                                           type="number"
                                           className={`${styleEditorPage.input} custom-input`}
                                           value={subject.office}
                                           onChange={changeSubjectHandler}
                                           disabled={isChose.session}
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
                <button className={`btn ${styleEditorPage.addLesson}`} onClick={addLesson}
                        disabled={form.subjects.length > maxLesson.maxLesson[form.session.index] || isChose.session}>+ урок</button>
                <h1/>
                <button
                    className={`btn ${styleEditorPage.button}`}
                    disabled={loading || isChose.session || form.subjects.length > maxLesson.maxLesson[form.session.index]}
                    onClick={sendHandler}
                >
                    Отправить
                </button>
            </div>
        </div>


    </div>
};