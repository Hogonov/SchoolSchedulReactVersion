import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import Grid from "@material-ui/core/Grid";
import stylesTimePage from './TimePage.module.css';

export const AddTimePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        session: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', date: new Date()
    });
    const [flag, setFlag] = useState({flag: false});

    const changeHandler = event => {
        setForm({...form, [event.target.id]: event.target.value});
        console.log(form)
    };

    const changeHandlerSession = event => {
        setForm({...form, session: event.value});
        if (event.value.indexOf("special") !== -1) {
            setFlag({flag: true})
        } else {
            setFlag({flag: false})
        }
    };

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const addTimeHandler = async () => {
        try {
            const data = await request('/api/table/add_time', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };

    return (
            <div className={stylesTimePage.backgroundBoard}>
                <h1 className={stylesTimePage.title}>Редактор звонков</h1>
                <div className={stylesTimePage.timeRedactor}>
                    <div className={`${stylesTimePage.session}  ${stylesTimePage.first}`}>
                        <h3>Смена I</h3>
                        <div className={stylesTimePage.nameTimePack}>
                            <h5>Продолжительность урока</h5><label>
                            <input type="number" min="0" max="60" />
                        </label>
                        </div>
                        <table className={stylesTimePage.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Начало</td>
                                <td className={stylesTimePage.titleTable}>Конец</td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>1</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>2</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>3</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>4</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>5</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>6</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>

                        </table>
                        <button
                            className={`btn ${stylesTimePage.button}`}
                            disabled={loading}
                            // onClick={sendHandler}
                        >
                            Отправить
                        </button>
                    </div>
                    <div className={stylesTimePage.verticalLine}></div>
                    <div className={`${stylesTimePage.session}  ${stylesTimePage.second}`}>
                        <h3>Смена II</h3>
                        <div className={stylesTimePage.nameTimePack}>
                            <h5>Продолжительность урока</h5><label>
                            <input type="number" min="0" max="60"/>
                        </label>
                        </div>
                        <table className={stylesTimePage.table}>
                            <tr>
                                <td className={stylesTimePage.titleTable}>№</td>
                                <td className={stylesTimePage.titleTable}>Начало</td>
                                <td className={stylesTimePage.titleTable}>Конец</td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>1</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>2</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>3</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>4</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>5</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>
                            <tr className={stylesTimePage.cellTable}>
                                <td>6</td>
                                <td><input type="time"/></td>
                                <td><input type="time"/></td>
                            </tr>

                        </table>
                        <button
                            className={`btn ${stylesTimePage.button}`}
                            disabled={loading}
                            // onClick={sendHandler}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            {/*<h1/>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Добавление времени</span>
                        <div className="input-group mb-3">
                            <Select onChange={changeHandlerSession}
                                    id="session"
                                    placeholder="Выберите смену"
                                    className="black-text"
                                    options={[{value: "first", label: "Первая смена"},
                                        {value: "second", label: "Вторая смена"},
                                        {value: "specialFirst", label: "Сокращенная первая смена"},
                                        {value: "specialSecond", label: "Сокращенная вторая смена"}
                                    ]
                                    }
                                    name="session"
                            />
                            {flag.flag && <div className="input-group">
                                <label htmlFor="deleteDate" className="white-text">Дата сокращенной смены</label>
                                <input
                                    id="date"
                                    type="date"
                                    name="deleteDate"
                                    className="yellow-input white-text"
                                    value={form.date}
                                    onChange={changeHandler}
                                />
                            </div>
                            }
                            <h1/>

                            <div className="input-field white-text">
                                <input
                                    placeholder="Введите время"
                                    id="time1"
                                    type="text"
                                    name="time"
                                    className="yellow-input white-text"
                                    value={form.time1}
                                    onChange={changeHandler}
                                />
                                <h1/>
                                <input
                                    placeholder="Введите время"
                                    id="time2"
                                    type="text"
                                    name="time"
                                    className="yellow-input white-text"
                                    value={form.time2}
                                    onChange={changeHandler}
                                />
                                <h1/>
                                <input
                                    placeholder="Введите время"
                                    id="time3"
                                    type="text"
                                    name="time"
                                    className="yellow-input white-text"
                                    value={form.time3}
                                    onChange={changeHandler}
                                />
                                <h1/>
                                <input
                                    placeholder="Введите время"
                                    id="time4"
                                    type="text"
                                    name="time"
                                    className="yellow-input white-text"
                                    value={form.time4}
                                    onChange={changeHandler}
                                />
                                <h1/>
                                <input
                                    placeholder="Введите время"
                                    id="time5"
                                    type="text"
                                    name="time"
                                    className="yellow-input white-text"
                                    value={form.time5}
                                    onChange={changeHandler}
                                />
                                <h1/>
                                <input
                                    placeholder="Введите время"
                                    id="time6"
                                    type="text"
                                    name="time"
                                    className="yellow-input white-text"
                                    value={form.time6}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={addTimeHandler}
                        >
                            Добавить время
                        </button>
                    </div>
                </div>
            </div>*/}
        </div>
    )
};