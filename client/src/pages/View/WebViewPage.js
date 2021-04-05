import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"
import {ViewTable} from "./ViewTable";
import DatePicker from "react-multi-date-picker"


export const WebViewPage = props => {
    if (!props.isAuthenticated) {
        try {
            document.getElementById('routerDiv').className = 'specialContainer'
        } catch (e) {

        }
    }

    const {loading, request} = useHttp();
    const [options, setOptions] = useState({schools: [], classes: [], sessions: []});
    const [flag, setFlag] = useState({disable: true, table: false, specialDate: false})
    const [form, setForm] = useState({
        school: '',
        classroom: '',
        dates: [],
        date: ''
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
        setForm({...form, dates: calculateDates()})
    }, [getData]);

    const calculateDates = (strDate) => {
        try {
            let nowDate = !!strDate ? new Date(strDate[0], strDate[1], strDate[2]) : new Date()
            while (nowDate.getDay() !== 1) {
                nowDate.setDate(nowDate.getDate() - 1)
            }
            let monday = nowDate
            let weekDatesArr = [`${monday.getDate()}.${monday.getMonth() < 10 ? `0${monday.getMonth() + 1}` : monday.getMonth() + 1}.${monday.getFullYear()}`]
            while (monday.getDay() !== 6) {
                monday.setDate(monday.getDate() + 1)
                weekDatesArr.push(`${monday.getDate()}.${monday.getMonth() < 10 ? `0${monday.getMonth() + 1}` : monday.getMonth() + 1}.${monday.getFullYear()}`)
            }
            return weekDatesArr
        } catch (e) {
            console.log(e)
        }
    }

    const changeDateHandler = event => {
        try {
            console.log(flag)
            let year = event.year
            let month = event.month.number < 10 ? `0${event.month.number}` : event.month.number
            let day = event.day < 10 ? `0${event.day}` : event.day
            let weekDatesArr = calculateDates([year, month - 1, day])
            setForm({...form, date: `${year}/${month}/${day}`, dates: weekDatesArr})
            let specialDate = false
            for (let i = 0; i < options.sessions.specialDates.length; i++) {
                if(weekDatesArr.indexOf(options.sessions.specialDates[i]) !== -1){
                    specialDate = true
                }
            }
            setFlag({...flag, specialDate: specialDate})

        } catch (e) { console.log(e)}
    }


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
                }
                for (let i = 0; i < fullForm.form.length; i++) {
                    for (let j = fullFormArr[i].subjects.length; j < data.maxLength; j++) {
                        fullFormArr[i].subjects.push({
                            index: j,
                            name: `subject-${j}`,
                            option: {label: '', value: ''},
                            office: '',
                            time: ''
                        })
                    }
                }
                setFullForm({classname: classname, form: fullFormArr})
                let flagSpecialDate = false
                for (let i = 0; i < options.sessions.specialDates.length; i++) {
                    if(form.dates.indexOf(options.sessions.specialDates[i]) !== -1){
                        flagSpecialDate = true
                        break
                    }
                }
                setFlag({...flag, table: true, specialDate: flagSpecialDate})
            }
        } catch (e) {
            console.log(e);
        }
    }, [setFlag, flag, setForm, form, setFullForm, fullForm, options, setOptions]);

    const changeSelectHandler = useCallback(async (event, action) => {
        setForm({...form, [action.name]: event});
        if (action.name === 'school') {
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
                <div className={`${style.schoolChoose}`}>
                    <Select
                        onChange={changeSelectHandler}
                        id="school"
                        placeholder="Выберите школу"
                        className={`${style.selector}`}
                        options={options.schools}
                        value={form.school}
                        name="school"
                    />
                </div>
                <div className={`${style.classChoose}`}>
                    <Select
                        onChange={changeSelectHandler}
                        id="classroom"
                        placeholder="Выберите класс"
                        className={`${style.selector}`}
                        options={options.classes}
                        value={form.classroom}
                        isDisabled={flag.disable}
                        name="classroom"
                    />
                </div>
                <div className={`${style.datePickerDiv} ${!flag.table ? style.greyBack : ''}`}>
                    <DatePicker
                        months={[
                            ["Январь", "Янв"],
                            ["Февраль", "Фев"],
                            ["Март", "Мар"],
                            ["Апрель", "Апр"],
                            ["Май", "Май"],
                            ["Июнь", "Июн"],
                            ["Июль", "Июл"],
                            ["Август", "Авг"],
                            ["Сентябрь", "Сен"],
                            ["Октябрь", "Окт"],
                            ["Ноябрь", "Ноя"],
                            ["Декабрь", "Дек"],
                        ]}
                        weekDays={[
                            ["Воскресенье", "Вс"],
                            ["Понедельник", "Пн"],
                            ["Вторник", "Вто"],
                            ["Среда", "Ср"],
                            ["Четверг", "Чт"],
                            ["Пятница", "Пт"],
                            ["Суббота", "Сб"],
                        ]}
                        mapDays={({ date }) => {
                            let props = {}
                            let isWeekend = [0].includes(date.weekDay.index)
                            if (isWeekend) props.className = "highlight highlight-red"
                            return props
                        }}
                        inputClass="custom-input"
                        placeholder="Выберите дату"
                        disabled={!flag.table}
                        className={`${style.datePicker}`}
                        onChange={changeDateHandler}
                        value={form.date}
                    />
                </div>
            </div>
            {flag.table && <ViewTable
                fullForm={fullForm}
                options={options}
                form={form}
                flag={flag}
            />}

        </div>
    )
};