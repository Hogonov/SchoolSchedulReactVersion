import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"
import {useAuth} from "../../hooks/auth.hook";
import {ViewTable} from "./ViewTable";


export const WebViewPage = () => {

    const message = useMessage();
    const auth = useAuth(AuthContext)
    const {loading, request, error, clearError} = useHttp();
    const [options, setOptions] = useState({schools: [], classes: [], sessions: []});
    const [flag, setFlag] = useState({disable: true, table: false})
    const [form, setForm] = useState({
        school: '',
        classroom: '',
    });
    const [fullForm, setFullForm] = useState({
        classname: '',
        form: [
            {
                classname: '',
                session: {label: 'Первая смена', value: 'firstSession'},
                time: [],
                day: {value: 'Понедельник', label: 'Понедельник', name: 'day', index: "0"},
                subjects: [{index: 1, name: 'subject-1', option: {label: '', value: ''}, office: '', time: ''}]
            }, {
                classname: '',
                session: {label: 'Первая смена', value: 'firstSession'},
                time: [],
                day: {value: 'Вторник', label: 'Вторник', name: 'day', index: "1"},
                subjects: [{index: 1, name: 'subject-1', option: {label: '', value: ''}, office: '', time: ''}]
            }, {
                classname: '',
                session: {label: 'Первая смена', value: 'firstSession'},
                time: [],
                day: {value: 'Среда', label: 'Среда', name: 'day', index: "2"},
                subjects: [{index: 1, name: 'subject-1', option: {label: '', value: ''}, office: '', time: ''}]
            }, {
                classname: '',
                session: {label: 'Первая смена', value: 'firstSession'},
                time: [],
                day: {value: 'Четверг', label: 'Четверг', name: 'day', index: "3"},
                subjects: [{index: 1, name: 'subject-1', option: {label: '', value: ''}, office: '', time: ''}]
            }, {
                classname: '',
                session: {label: 'Первая смена', value: 'firstSession'},
                time: [],
                day: {value: 'Пятница', label: 'Пятница', name: 'day', index: "4"},
                subjects: [{index: 1, name: 'subject-1', option: {label: '', value: ''}, office: '', time: ''}]
            }, {
                classname: '',
                session: {label: 'Первая смена', value: 'firstSession'},
                time: [],
                day: {value: 'Суббота', label: 'Суббота', name: 'day', index: "5"},
                subjects: [{index: 1, name: 'subject-1', option: {label: '', value: ''}, office: '', time: ''}]
            }
        ]
    });




    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/table/get_school`, 'GET', null);
            setOptions({...options, schools: fetched.schools});
        } catch (e) {

        }
    }, [request]);

    useEffect(() => {
        getData();
    }, [getData]);


    const getClasses = useCallback(async (event) => {
        try {
            const data = await request(`/api/table/get_view_classes/${event.value}`, 'GET', null);
            const dataSession = await request(` /api/time/get_data/${event.value}`, 'GET', null);
            setOptions({...options, classes: data, sessions: dataSession});
        } catch (e) {
            console.log(e)
        }
    }, [setOptions, options]);

    const getDataClassroom = useCallback(async (classname) => {
        try {
            const data = await request(`/api/table/get_data_class/${classname.value}/${form.school.value}`, 'GET', null);
            if (data.candidate) {
                let fullFormArr = []
                for (let i = 0; i < fullForm.form.length; i++) {
                    if (i < data.candidateData.days.length) {
                        fullFormArr.push(data.candidateData.days[i])
                    } else {
                        fullFormArr.push({...fullForm.form[i], classname: classname})
                    }
                    console.log(i,fullFormArr[i])
                }
                for (let i = 0; i < fullForm.form.length; i++) {
                    for (let j = fullFormArr[i].subjects.length; j < data.maxLength; j++) {
                        fullFormArr[i].subjects.push({index: j, name: `subject-${j}`, option: {label: '', value: ''}, office: '', time: ''})
                    }
                }

                setFullForm({classname: classname, form: fullFormArr})
                setFlag({...flag, table: true})
                console.log(fullFormArr)
            }
        } catch (e) {
            console.log(e);
        }
    }, [auth.token, setForm, form]);

    const changeSelectHandler = useCallback(async (event, action) => {
        setForm({...form, [action.name]: event});
        if (action.name === 'school') {
            console.log(flag)
            setFlag({...flag, disable: false})
            await getClasses(event)
        } else if (action.name === 'classroom') {
            await getDataClassroom(event)
        }
    }, [getClasses, setForm, form])


    if (loading) {
        return <Loader/>
    }

    return (
        <div className={style.main}>
            <div className={style.selectBlock}>
                <div>
                    <Select
                        onChange={changeSelectHandler}
                        id="school"
                        placeholder="Выберите школу"
                        className={`${style.selector} ${style.schoolChoose}`}
                        options={options.schools}
                        value={form.school}
                        name="school"
                    />
                </div>
                <div>
                    <Select
                        onChange={changeSelectHandler}
                        id="classroom"
                        placeholder="Выберите класс"
                        className={`${style.selector} ${style.classChoose}`}
                        options={options.classes}
                        value={form.classroom}
                        isDisabled={flag.disable}
                        name="classroom"
                    />
                </div>
            </div>
            {flag.table && <ViewTable
                fullForm={fullForm}
                options={options}
            />}

        </div>
    )
};