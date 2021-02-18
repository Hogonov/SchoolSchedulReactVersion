import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"
import {TimeBlock} from "./TimeBlock";
import {ClassBlock} from "./ClassBlock";


export const ViewTable = props => {

    const days = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ]
    return (
        <div className={style.viewTable}>
            <TimeBlock
                fullForm={props.fullForm}
                options={props.options}
            />
            {days.map((day, index) => {
                return <ClassBlock
                    day={day}
                    key={index}
                    index={index}
                    fullForm={props.fullForm}
                    options={props.options}
                />
            })}
        </div>
    )
};