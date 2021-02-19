import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import Grid from "@material-ui/core/Grid";
import stylesYearSchoolPage from './YearSchoolPage.module.css';


export const Quarter = (props) => {

    const changeHandler = event => {
        props.setForm({...props.form, [event.target.name]: event.target.value})
    };

    return (
        <div className={stylesYearSchoolPage.quarter}>
            <h3>{props.nameQuarter}</h3>
            <div>
                <div className={stylesYearSchoolPage.time}>
                    <h5>Начало четверти</h5><label>
                    <input name={`start${props.name}`}
                           type="date"
                           value={props.dateStart}
                           onChange={changeHandler}
                    />
                </label>
                </div>
                <div className={stylesYearSchoolPage.time}>
                    <h5>Конец четверти</h5><label>
                    <input name={`end${props.name}`}
                           type="date"
                           value={props.dateEnd}
                           onChange={changeHandler}
                    />
                </label>
                </div>
            </div>
        </div>

    )
};