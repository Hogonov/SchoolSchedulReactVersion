import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"


export const ChooseClassBlock = props => {

    const changeHandler = (event, action) => {
        props.setForm({...props.form, [action.name]: event});
    };

    return (
        <div className={style.classChoose}>
            <h1>Классы</h1>
        </div>
    )
};