import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import stylesTimePage from './TimePage.module.css';
import {Nav} from "react-bootstrap";
import {TimeTable} from "./TimeTable";


export const AddTimePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        lengthLesson: [0, 0],
        isSpecial: false,
        times: [
            {
                startTime1: '', endTime1: '',
                startTime2: '', endTime2: '',
                startTime3: '', endTime3: '',
                startTime4: '', endTime4: '',
                startTime5: '', endTime5: '',
                startTime6: '', endTime6: ''
            }, {
                startTime1: '', endTime1: '',
                startTime2: '', endTime2: '',
                startTime3: '', endTime3: '',
                startTime4: '', endTime4: '',
                startTime5: '', endTime5: '',
                startTime6: '', endTime6: ''
            }
        ]
    });
    const [flag, setFlag] = useState(false);
    const [title, setTitle] = useState({text: 'Редактор звонков'});

    const changeHandler = event => {
        let length = +event.target.value > +event.target.max ? event.target.max : event.target.value;
        if (event.target.id === '0') {
            setForm({...form, lengthLesson: [length, form.lengthLesson[1]]});
        } else {
            setForm({...form, lengthLesson: [form.lengthLesson[0], length]});
        }
        //console.log(form)
    };


    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const switcherFlag = () => {
        if (!flag) setFlag(true)
        else setFlag(false)

    }

    const switcherSpecialDay = () => {
        if(form.isSpecial){
            setTitle({text: 'Редактор звонков'})
        } else {
            setTitle({text: 'Редактор празднечных звонков'})
        }
        setForm({...form, isSpecial: !form.isSpecial});

    }

    const sendHandler = async (event) => {
        try {
            setForm({...form, session: event.target.value});
            const data = await request('/api/table/add_time', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
            console.log(form)
        } catch (e) {
        }
    };

    return (
        <div className={stylesTimePage.main + " " + (!flag && stylesTimePage.oneMain)}>
            <h3 className={stylesTimePage.title}>{title.text}
                <svg onClick={switcherSpecialDay} className={stylesTimePage.buttonSpecialDay}/>
            </h3>
            <div className={stylesTimePage.timeRedactor + " " + (!flag && stylesTimePage.oneTimeRedactor)}>
                <div className={`${stylesTimePage.session}  ${stylesTimePage.first}`}>
                    <h3>Смена I
                        {!flag && <svg onClick={switcherFlag} className={stylesTimePage.buttonSwitcherAdd}/>}
                    </h3>
                    <div className={stylesTimePage.nameTimePack}>
                        <h5>Продолжительность урока</h5><label>
                        <input id="0" type="number" min="0" max="60" value={form.lengthLesson[0]}
                               onChange={changeHandler}/>
                    </label>
                    </div>
                    <TimeTable
                        session="0"
                        form={form}
                        setForm={setForm}
                        time={form.times[0]}
                    />
                </div>
                {flag && <div className={stylesTimePage.verticalLine}/>}
                {flag &&
                <div className={`${stylesTimePage.session}  ${stylesTimePage.second}`}>
                    <h3>Смена II <svg onClick={switcherFlag} className={stylesTimePage.buttonSwitcherDel}/></h3>
                    <div className={stylesTimePage.nameTimePack}>
                        <h5>Продолжительность урока</h5><label>
                        <input id="1" type="number" min="0" max="60" value={form.lengthLesson[1]}
                               onChange={changeHandler}/>
                    </label>
                    </div>
                    <TimeTable
                        session="1"
                        form={form}
                        setForm={setForm}
                        time={form.times[1]}
                    />
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