import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Loader} from "../../components/Loader";
import style from "./ViewPage.module.css"


export const ClassBlock = props => {
    let flag = props.options.sessions.specialDates.indexOf(props.form.dates[props.index]) !== -1
    return (
        <div className={style.classBlock}>
            <div className={`${style.titleTable} ${style.leftMargin} ${style.lastMargin} ${flag ? style.specialTitle : ''}`}>{props.day}<br/>{props.form.dates[props.index]}</div>
            {props.fullForm.form[props.index].subjects.map((subject, index) => {
                if (subject.option !== null && props.fullForm.form[props.index].session.value.indexOf('first') !== -1) {
                    return <div className={`${style.subject} ${style.leftMargin} ${style.lastMargin}`}
                                key={index}
                    >
                        <div className={style.subjectTitle}>{subject.option.label}</div>
                        {subject.option.label !== '' && <div>каб. {subject.office}</div>}
                    </div>
                } else {
                    return <div className={`${style.subject} ${style.leftMargin} ${style.lastMargin}`}
                                key={index}
                    />
                }
            })}

            {props.fullForm.form[props.index].subjects.map((subject, index) => {
                let isFirstIndex = index === 0
                let isLastIndex = index !== props.options.sessions.secondSession.length - 1
                if (subject.option !== null && props.fullForm.form[props.index].session.value.indexOf('second') !== -1) {
                    return <div
                        className={`${isFirstIndex && style.firstIndexSecondSession} ${style.subject} ${style.leftMargin}
                               ${isLastIndex && style.lastMargin}`}
                        key={index}
                    >
                        <div className={style.subjectTitle}>{subject.option.label}</div>
                        {subject.option.label !== '' && <div>каб. {subject.office}</div>}
                    </div>
                } else {
                    return <div
                        className={`${isFirstIndex && style.firstIndexSecondSession} ${style.subject} ${style.leftMargin}
                                ${isLastIndex && style.lastMargin}`}
                        key={index}/>
                }
            })}


        </div>
    )
}