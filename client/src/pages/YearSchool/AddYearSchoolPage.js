import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Grid from "@material-ui/core/Grid";

export const AddYearSchoolPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        nameYear: '', startYear: Date, finishYear: Date,
        nameQuarter1: '', startQuarter1: Date, finishQuarter1: Date,
        nameQuarter2: '', startQuarter2: Date, finishQuarter2: Date,
        nameQuarter3: '', startQuarter3: Date, finishQuarter3: Date,
        nameQuarter4: '', startQuarter4: Date, finishQuarter4: Date
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const addQuarterSchoolHandler = async () => {
        try {
            console.log(form);
            const data = await request('/api/year/add', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
            message(data.message)
        } catch (e) {
        }
    };


    return (
        <div className="row">
            <h1/>
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Добавление данных</span>
                        <div className="input-group mb-3">
                            <div className="input-field">
                                <input
                                    placeholder="Введите назнавние года"
                                    id="nameYear"
                                    type="text"
                                    name="nameYear"
                                    className="yellow-input white-text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="quarterSchool">Год</label>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow:1}}>
                                    <input
                                        placeholder="Введите дату начала года"
                                        type="date"
                                        name="startYear"
                                        className="yellow-input white-text"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input
                                           placeholder="Введите дату конца года"
                                           type="date"
                                           className="yellow-input white-text"
                                           name="finishYear"
                                           onChange={changeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <h1/>
                            <div className="input-field">
                                <input
                                    placeholder="Введите назнавние четверти"
                                    id="nameYear"
                                    type="text"
                                    name="nameQuarter1"
                                    className="yellow-input white-text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="quarterSchool">Первая четветь</label>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow:1}}>
                                    <input
                                        placeholder="Введите дату начала четверти"
                                        type="date"
                                        name="startQuarter1"
                                        className="yellow-input white-text"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input
                                        placeholder="Введите дату конца четверти"
                                        type="date"
                                        className="yellow-input white-text"
                                        name="finishQuarter1"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <h1/>
                            <div className="input-field">
                                <input
                                    placeholder="Введите назнавние четверти"
                                    id="nameYear"
                                    type="text"
                                    name="nameQuarter2"
                                    className="yellow-input white-text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="quarterSchool">Вторая четветь</label>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow:1}}>
                                    <input
                                        placeholder="Введите дату начала четверти"
                                        type="date"
                                        name="startQuarter2"
                                        className="yellow-input white-text"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input
                                        placeholder="Введите дату конца четверти"
                                        type="date"
                                        className="yellow-input white-text"
                                        name="finishQuarter2"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <h1/>
                            <div className="input-field">
                                <input
                                    placeholder="Введите назнавние четверти"
                                    id="nameYear"
                                    type="text"
                                    name="nameQuarter3"
                                    className="yellow-input white-text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="quarterSchool">Третья четветь</label>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow:1}}>
                                    <input
                                        placeholder="Введите дату начала четверти"
                                        type="date"
                                        name="startQuarter3"
                                        className="yellow-input white-text"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input
                                        placeholder="Введите дату конца четверти"
                                        type="date"
                                        className="yellow-input white-text"
                                        name="finishQuarter3"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <h1/>
                            <div className="input-field">
                                <input
                                    placeholder="Введите назнавние четверти"
                                    id="nameYear"
                                    type="text"
                                    name="nameQuarter4"
                                    className="yellow-input white-text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="quarterSchool">Четвертая четветь</label>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item style={{flexGrow:1}}>
                                    <input
                                        placeholder="Введите дату начала четверти"
                                        type="date"
                                        name="startQuarter4"
                                        className="yellow-input white-text"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <input
                                        placeholder="Введите дату конца четверти"
                                        type="date"
                                        className="yellow-input white-text"
                                        name="finishQuarter4"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={addQuarterSchoolHandler}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};