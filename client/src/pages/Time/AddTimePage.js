import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import stylesTimePage from './TimePage.module.css';
import {otherTimeSetter, TimeTable} from "./TimeTable";
import DatePicker from "react-multi-date-picker";
import CustomDatePicker from "./CustomDatePicker";

// the locale you want  https://react-day-picker.js.org/examples/localization


export const AddTimePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        lengthLesson: [0, 0, 0, 0],
        isSpecial: false,
        times: {
            firstSession: [{index: 1, startTime: '', endTime: ''}],
            secondSession: [{index: 1, startTime: '', endTime: ''}],
            specialFirstSession: [{index: 1, startTime: '', endTime: ''}],
            specialSecondSession: [{index: 1, startTime: '', endTime: ''}]
        },
        specialDates: []
    });


    const [formTime, setFormTime] = useState({
        firstSession: [{index: 1, startTime: '', endTime: ''}],
        secondSession: [{index: 1, startTime: '', endTime: ''}],
    });

    const [flag, setFlag] = useState(false);
    const [title, setTitle] = useState({text: 'Редактор звонков'});

    const changeHandler = event => {
        let length = +event.target.value > +event.target.max ? +event.target.max : +event.target.value;
        let lengthArr = form.lengthLesson
        lengthArr.splice(+event.target.id, 1, length)
        setForm({...form, lengthLesson: lengthArr})
    };


    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(()=>{
        if(form.isSpecial){
            setFormTime({firstSession: form.times.specialFirstSession, secondSession: form.times.specialSecondSession})
        }else {
            setFormTime({firstSession: form.times.firstSession, secondSession: form.times.secondSession})
        }
    }, [form, setForm])


    useEffect(() => {
        window.M.updateTextFields()
    }, []);


    const switcherFlag = () => {
        if (!flag) setFlag(true)
        else setFlag(false)
    }

    const addLesson = (event) => {
        console.log("form = ", form)
        let subArr = form.times
        if (+event.target.id === 0) {
            if (form.isSpecial) {
                let index = subArr.specialFirstSession.length + 1
                if (index <= 10)
                    subArr.specialFirstSession.push({index: index, startTime: '', endTime: ''})
            } else {
                let index = subArr.firstSession.length + 1
                if (index <= 10){
                    subArr.firstSession.push({index: index, startTime: '', endTime: ''})
                }
            }
        } else {
            if (form.isSpecial) {
                let index = subArr.specialSecondSession.length + 1
                if (index <= 10)
                    subArr.specialSecondSession.push({index: index, startTime: '', endTime: ''})
            } else {
                let index = subArr.secondSession.length + 1
                if (index <= 10)
                    subArr.secondSession.push({index: index, startTime: '', endTime: ''})
            }
        }
        setForm({...form, times: subArr})
    }

    const switcherSpecialDay = () => {
        if (form.isSpecial) {
            setTitle({text: 'Редактор звонков'})
        } else {
            setTitle({text: 'Редактор празднечных звонков'})
        }
        setForm({...form, isSpecial: !form.isSpecial});
    }

    const sendHandler = async (event) => {
        try {
            setForm({...form, session: event.target.value});
            console.log(form)
            const data = await request('/api/time/add', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
            console.log(form)
        } catch (e) {
        }
    };


    return (
        <div className={stylesTimePage.main + " " + (!flag && stylesTimePage.oneMain)}>
            <h3 className={stylesTimePage.title}>{title.text}
                <svg onClick={switcherSpecialDay}
                     className={`${stylesTimePage.buttonSpecialDay} ${form.isSpecial ? stylesTimePage.buttonUsualDay : ''}`}
                />
            </h3>
            {form.isSpecial && <div className={stylesTimePage.divDatePicker}>
                <CustomDatePicker flag={flag} form={form} setForm={setForm}/>
            </div>}
            <div className={stylesTimePage.timeRedactor + " " + (!flag && stylesTimePage.oneTimeRedactor)}>
                <div className={`${stylesTimePage.session}  ${stylesTimePage.first}`}>
                    <h3>Смена I
                        {!flag && <svg onClick={switcherFlag} className={stylesTimePage.buttonSwitcherAdd}/>}
                    </h3>
                    <div className={stylesTimePage.nameTimePack}>
                        <h5>Продолжительность урока</h5><label>
                        <input id={form.isSpecial ? 2 : 0} type="number" min="0" max="120" value={form.lengthLesson[form.isSpecial ? 2 : 0]}
                               onChange={changeHandler}/>
                    </label>
                    </div>
                    <TimeTable
                        session='0'
                        form={form}
                        setForm={setForm}
                        time={formTime.firstSession}
                    />
                    <button className={`btn ${stylesTimePage.addLesson}`} onClick={addLesson} id={0}>+ урок</button>
                </div>
                {flag && <div className={stylesTimePage.verticalLine}>
                    <div/>
                </div>}
                {flag &&
                <div className={`${stylesTimePage.session}  ${stylesTimePage.second}`}>
                    <h3>Смена II <svg onClick={switcherFlag} className={stylesTimePage.buttonSwitcherDel}/></h3>
                    <div className={stylesTimePage.nameTimePack}>
                        <h5>Продолжительность урока</h5><label>
                        <input id={form.isSpecial ? 3 : 1} type="number" min="0" max="120" value={form.lengthLesson[form.isSpecial ? 3 : 1]}
                               onChange={changeHandler}/>
                    </label>
                    </div>
                    <TimeTable
                        session='1'
                        form={form}
                        setForm={setForm}
                        time={formTime.secondSession}
                    />
                    <button className={`btn ${stylesTimePage.addLesson}`} onClick={addLesson} id={1}>+ урок</button>
                </div>
                }
            </div>
            <button
                className={`btn ${stylesTimePage.button}`}
                disabled={loading}
                onClick={sendHandler}
            >
                Отправить
            </button>
        </div>
    )
};